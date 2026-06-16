<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$action = basename($path);

function generateJWT($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload['iat'] = time();
    $payload['exp'] = time() + JWT_EXPIRES_IN;
    $headerB64 = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $payloadB64 = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    $signature = hash_hmac('sha256', "$headerB64.$payloadB64", JWT_SECRET, true);
    $sigB64 = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    return "$headerB64.$payloadB64.$sigB64";
}

function verifyJWT($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    $signature = hash_hmac('sha256', "$parts[0].$parts[1]", JWT_SECRET, true);
    $sigB64 = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    if (!hash_equals($sigB64, $parts[2])) return false;
    $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
    if (!$payload || ($payload['exp'] ?? 0) < time()) return false;
    return $payload;
}

function getBearerToken() {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/', $header, $m)) return $m[1];
    return $_COOKIE['auth_token'] ?? null;
}

function requireAdmin() {
    $token = getBearerToken();
    if (!$token) { http_response_code(401); echo json_encode(['error' => 'No token', 'authenticated' => false]); exit; }
    $decoded = verifyJWT($token);
    if (!$decoded) { http_response_code(401); echo json_encode(['error' => 'Invalid token', 'authenticated' => false]); exit; }
    $conn = getDB();
    $stmt = $conn->prepare('SELECT id, username, email, role FROM users WHERE id = ? AND role = "admin"');
    $stmt->bind_param('i', $decoded['id']);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    if (!$result) { http_response_code(403); echo json_encode(['error' => 'Unauthorized', 'authenticated' => false]); exit; }
    return $result;
}

function sendVerificationEmail($to, $code) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = EMAIL_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = EMAIL_USER;
        $mail->Password = EMAIL_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = EMAIL_PORT;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ],
        ];
        $mail->setFrom(EMAIL_FROM, 'Serhan Kombos Otomotiv');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification Code';
        $mail->Body = '<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#f5f5f5;border-radius:12px">'
            . '<h2 style="color:#1a1a1a;margin-bottom:16px">Email Verification</h2>'
            . '<p style="color:#555;font-size:15px;margin-bottom:24px">Your verification code is:</p>'
            . '<div style="background:#000;color:#fff;font-size:32px;font-weight:700;text-align:center;padding:20px;border-radius:8px;letter-spacing:8px;margin-bottom:24px">' . $code . '</div>'
            . '<p style="color:#999;font-size:13px">This code will expire in 15 minutes.</p>'
            . '</div>';
        $mail->AltBody = "Your verification code is: $code\n\nThis code will expire in 15 minutes.";
        $mail->send();
    } catch (Exception $e) {
        error_log('Mailer Error: ' . $mail->ErrorInfo);
    }
}

switch ($action) {
    case 'login':
        if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        $data = json_decode(file_get_contents('php://input'), true);
        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';
        if (!$username || !$password) { http_response_code(400); echo json_encode(['error' => 'Username and password required']); break; }
        $conn = getDB();
        $stmt = $conn->prepare('SELECT id, username, email, role, verified, password FROM users WHERE username = ?');
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if (!$user || !password_verify($password, $user['password'])) { http_response_code(401); echo json_encode(['error' => 'Invalid credentials']); break; }
        if (!$user['verified']) { http_response_code(401); echo json_encode(['error' => 'Please verify your email', 'needsVerification' => true]); break; }
        if ($user['role'] !== 'admin') { http_response_code(401); echo json_encode(['error' => 'Unauthorized']); break; }
        $token = generateJWT(['id' => $user['id'], 'username' => $user['username'], 'email' => $user['email'], 'role' => $user['role']]);
         setcookie('auth_token', $token, [
             'expires' => time() + JWT_EXPIRES_IN,
             'path' => '/',
             'secure' => isset($_SERVER['HTTPS']),
             'httponly' => false,
             'samesite' => 'Lax'
         ]);
         echo json_encode(['id' => $user['id'], 'username' => $user['username'], 'email' => $user['email'], 'role' => $user['role'], 'token' => $token]);
        break;

    case 'signup':
        if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        $data = json_decode(file_get_contents('php://input'), true);
        $username = trim($data['username'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';
        if (!$username || !$email || !$password) { http_response_code(400); echo json_encode(['error' => 'All fields required']); break; }
        $conn = getDB();
        $stmt = $conn->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
        $stmt->bind_param('ss', $username, $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) { $stmt->close(); http_response_code(400); echo json_encode(['error' => 'Username or email exists']); break; }
        $stmt->close();
        $code = strval(rand(100000, 999999));
        $expires = date('Y-m-d H:i:s', time() + 900);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare('INSERT INTO users (username, email, password, role, verification_code, verification_expires, verified) VALUES (?, ?, ?, "admin", ?, ?, FALSE)');
        $stmt->bind_param('sssss', $username, $email, $hashedPassword, $code, $expires);
        $stmt->execute();
        $userId = $stmt->insert_id;
        $stmt->close();
        sendVerificationEmail($email, $code);
        echo json_encode(['message' => 'Verification code sent', 'requiresVerification' => true, 'userId' => $userId]);
        break;

    case 'verify-email':
        if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = intval($data['userId'] ?? 0);
        $code = trim($data['code'] ?? '');
        if (!$userId || !$code) { http_response_code(400); echo json_encode(['error' => 'User ID and code required']); break; }
        $conn = getDB();
        $stmt = $conn->prepare('SELECT * FROM users WHERE id = ? AND verification_code = ?');
        $stmt->bind_param('is', $userId, $code);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if (!$user) { http_response_code(400); echo json_encode(['error' => 'Invalid verification code']); break; }
        if (strtotime($user['verification_expires']) < time()) { http_response_code(400); echo json_encode(['error' => 'Verification code expired']); break; }
        $stmt = $conn->prepare('UPDATE users SET verified = TRUE, verification_code = NULL WHERE id = ?');
        $stmt->bind_param('i', $userId);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['message' => 'Email verified successfully', 'user' => ['id' => $user['id'], 'username' => $user['username'], 'email' => $user['email'], 'role' => $user['role']]]);
        break;

    case 'resend-code':
        if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        $data = json_decode(file_get_contents('php://input'), true);
        $email = trim($data['email'] ?? '');
        if (!$email) { http_response_code(400); echo json_encode(['error' => 'Email required']); break; }
        $conn = getDB();
        $stmt = $conn->prepare('SELECT id, email FROM users WHERE email = ? AND verified = FALSE');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        if (!$user) { http_response_code(400); echo json_encode(['error' => 'No unverified user found']); break; }
        $code = strval(rand(100000, 999999));
        $expires = date('Y-m-d H:i:s', time() + 900);
        $stmt = $conn->prepare('UPDATE users SET verification_code = ?, verification_expires = ? WHERE id = ?');
        $stmt->bind_param('ssi', $code, $expires, $user['id']);
        $stmt->execute();
        $stmt->close();
        sendVerificationEmail($email, $code);
        echo json_encode(['message' => 'Verification code resent']);
        break;

    case 'verify':
        if ($method !== 'GET') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        $user = requireAdmin();
        echo json_encode(['id' => $user['id'], 'username' => $user['username'], 'email' => $user['email'], 'role' => $user['role'], 'authenticated' => true]);
        break;

    case 'logout':
        if ($method !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); break; }
        setcookie('auth_token', '', time() - 3600, '/');
        header('Set-Cookie: auth_token=; Max-Age=0; Path=/; HttpOnly');
        echo json_encode(['message' => 'Logged out']);
        break;

    default:
        return;
}
