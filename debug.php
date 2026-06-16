<?php
// Enable all error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Also log to a custom debug file
function debugLog($msg) {
    file_put_contents(__DIR__ . '/debug.log', date('Y-m-d H:i:s') . ' ' . $msg . "\n", FILE_APPEND);
}

debugLog("=== debug.php loaded ===");

echo "<h2>PHP Debug Info</h2>";
echo "<pre>";
echo "PHP Version: " . phpversion() . "\n";
echo "Server Software: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'unknown') . "\n";
echo "Document Root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'unknown') . "\n";
echo "Script Filename: " . ($_SERVER['SCRIPT_FILENAME'] ?? 'unknown') . "\n";
echo "display_errors: " . ini_get('display_errors') . "\n";
echo "error_reporting: " . ini_get('error_reporting') . "\n";
echo "error_log: " . ini_get('error_log') . "\n";
echo "opcache enabled: " . (function_exists('opcache_get_status') && opcache_get_status() ? 'YES' : 'NO') . "\n";
echo "</pre>";

// Test database connection
echo "<h2>Database Test</h2>";
echo "<pre>";
try {
    require_once __DIR__ . '/api/db.php';
    $conn = getDB();
    echo "Database connection: OK\n";
    
    // Test query
    $result = $conn->query("SELECT COUNT(*) as cnt FROM survey_responses");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "Survey responses count: " . $row['cnt'] . "\n";
    } else {
        echo "Query failed: " . $conn->error . "\n";
    }
} catch (Exception $e) {
    echo "Database error: " . $e->getMessage() . "\n";
    debugLog("Database error: " . $e->getMessage());
}
echo "</pre>";

// Test auth
echo "<h2>Auth Test</h2>";
echo "<pre>";
try {
    require_once __DIR__ . '/api/auth.php';
    echo "Auth file loaded: OK\n";
    echo "JWT_SECRET defined: " . (defined('JWT_SECRET') ? 'YES' : 'NO') . "\n";
} catch (Exception $e) {
    echo "Auth error: " . $e->getMessage() . "\n";
    debugLog("Auth error: " . $e->getMessage());
}
echo "</pre>";

// Show existing error log if any
echo "<h2>Error Log</h2>";
echo "<pre>";
$errorLog = __DIR__ . '/error.log';
if (file_exists($errorLog)) {
    echo file_get_contents($errorLog);
} else {
    echo "No error.log file found at: $errorLog\n";
}
echo "</pre>";

// Show debug log if any
echo "<h2>Debug Log</h2>";
echo "<pre>";
$debugLog = __DIR__ . '/debug.log';
if (file_exists($debugLog)) {
    echo file_get_contents($debugLog);
} else {
    echo "No debug.log file found yet\n";
}
echo "</pre>";

// Show PHP errors from error_get_last
echo "<h2>Last PHP Error</h2>";
echo "<pre>";
$lastError = error_get_last();
if ($lastError) {
    print_r($lastError);
} else {
    echo "No errors captured\n";
}
echo "</pre>";

// Check file permissions
echo "<h2>File Permissions</h2>";
echo "<pre>";
$files = ['api/db.php', 'api/auth.php', 'api/config.php', 'api/survey.php', 'admin.php', 'index.php', 'assets/css/style.css'];
foreach ($files as $f) {
    $path = __DIR__ . '/' . $f;
    if (file_exists($path)) {
        echo "$f - exists, readable: " . (is_readable($path) ? 'YES' : 'NO') . ", size: " . filesize($path) . " bytes\n";
    } else {
        echo "$f - MISSING\n";
    }
}
echo "</pre>";

// Continuous error monitoring - auto-refresh every 5 seconds
echo "<script>
setTimeout(function() { location.reload(); }, 5000);
</script>";
echo "<p><em>Auto-refreshing every 5 seconds...</em></p>";
