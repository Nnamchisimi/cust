<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/api/config.php';
require_once __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

echo "<h2>PHPMailer Send Test</h2>";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = EMAIL_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = EMAIL_USER;
    $mail->Password = EMAIL_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = EMAIL_PORT;
    $mail->SMTPDebug = 3;
    $mail->Timeout = 30;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];
    $mail->setFrom(EMAIL_FROM, 'Serhan Kombos Otomotiv');
    $mail->addAddress('kombosawb@gmail.com');
    $mail->isHTML(true);
    $mail->Subject = 'Test Email';
    $mail->Body = '<h2>Test</h2><p>If you receive this, SMTP is working!</p>';
    $mail->AltBody = 'Test - If you receive this, SMTP is working!';

    $mail->send();
    echo "<p style='color:green;font-size:18px'>✅ Email sent successfully!</p>";
} catch (Exception $e) {
    echo "<p style='color:red;font-size:18px'>❌ Failed: " . $mail->ErrorInfo . "</p>";
    echo "<p>Exception: " . $e->getMessage() . "</p>";
}
