<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>SMTP Connectivity Test</h2>";

$host = 'anket.kombosotomotiv.com';
$port = 465;
$timeout = 10;

echo "<p>Testing connection to <strong>$host:$port</strong>...</p>";

$connection = @fsockopen('ssl://' . $host, $port, $errno, $errstr, $timeout);

if ($connection) {
    echo "<p style='color:green'>✅ Connection successful!</p>";
    fclose($connection);
} else {
    echo "<p style='color:red'>❌ Connection failed: [$errno] $errstr</p>";
}

echo "<p>Testing without SSL wrapper...</p>";
$connection2 = @fsockopen($host, $port, $errno2, $errstr2, $timeout);

if ($connection2) {
    echo "<p style='color:green'>✅ Connection successful (no SSL wrapper)!</p>";
    fclose($connection2);
} else {
    echo "<p style='color:red'>❌ Connection failed: [$errno2] $errstr2</p>";
}

echo "<h3>PHP Info</h3>";
echo "<p>allow_url_fopen: " . ini_get('allow_url_fopen') . "</p>";
echo "<p>OpenSSL: " . (extension_loaded('openssl') ? 'Loaded' : 'NOT loaded') . "</p>";
echo "<p>Sockets: " . (extension_loaded('sockets') ? 'Loaded' : 'NOT loaded') . "</p>";

if (function_exists('curl_init')) {
    echo "<p>cURL: Available</p>";
    $ch = curl_init("https://$host");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    echo "<p>cURL HTTP code: $httpCode</p>";
    if ($curlError) echo "<p>cURL error: $curlError</p>";
} else {
    echo "<p>cURL: NOT available</p>";
}
