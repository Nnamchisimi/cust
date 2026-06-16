<?php
define('JWT_SECRET', 'serhan-kombos-secret-key-2024-rev2');
define('JWT_EXPIRES_IN', 86400);

define('EMAIL_HOST', 'anket.kombosotomotiv.com');
define('EMAIL_PORT', 465);
define('EMAIL_USER', '_mainaccount@anket.kombosotomotiv.com');
define('EMAIL_PASS', 'Si2026mi+!');
define('EMAIL_FROM', '_mainaccount@anket.kombosotomotiv.com');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
