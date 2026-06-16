<?php
function getDB() {
    static $conn = null;
    if ($conn === null) {
        $host = 'localhost';
        $port = 3306;
        $user = 'simi_simi';
        $pass = 'Kombosawb@26.';
        $db   = 'simi_customer_survey';
        $conn = new mysqli($host, $user, $pass, $db, $port);
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
            exit;
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}

function initDatabase() {
    $conn = getDB();
    $conn->query("CREATE TABLE IF NOT EXISTS survey_responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        licensePlate VARCHAR(50) NOT NULL,
        branch VARCHAR(100) NOT NULL,
        department VARCHAR(255) NOT NULL,
        overallSatisfaction INT,
        maintenance INT,
        bodywork INT,
        appointment INT,
        advisor INT,
        workshopRepair INT,
        carWash INT,
        comments TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    $conn->query("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        verification_code VARCHAR(10),
        verified BOOLEAN NOT NULL DEFAULT FALSE,
        verification_expires DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    $admin = 'contactflowair@gmail.com';
    $defaultPassword = 'ab';
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param('s', $admin);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, role, verified) VALUES (?, ?, ?, 'admin', TRUE)");
        $stmt->bind_param('sss', $admin, $admin, $hashedPassword);
        $stmt->execute();
    } else {
        $user = $result->fetch_assoc();
        if (!password_verify($defaultPassword, $user['password'])) {
            $hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);
            $stmt->close();
            $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->bind_param('si', $hashedPassword, $user['id']);
            $stmt->execute();
        }
    }
    $stmt->close();
}

// initDatabase(); // Uncomment on first run to create tables and admin user
