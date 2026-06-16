<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

function logError($msg) {
    @file_put_contents(__DIR__ . '/debug.log', date('Y-m-d H:i:s') . ' ' . $msg . "\n", FILE_APPEND);
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = array_values(array_filter(explode('/', trim($path, '/'))));
$lastSegment = end($segments);

if (isset($_GET['action'])) {
    $lastSegment = $_GET['action'];
}

logError("Request: $method $path | lastSegment: $lastSegment");

switch ($lastSegment) {
    case 'responses':
        if ($method === 'GET') {
            $conn = getDB();
            $branch = $_GET['branch'] ?? null;
            if ($branch) {
                $stmt = $conn->prepare('SELECT * FROM survey_responses WHERE branch = ? ORDER BY createdAt DESC');
                $stmt->bind_param('s', $branch);
                $stmt->execute();
                $result = $stmt->get_result();
            } else {
                $result = $conn->query('SELECT * FROM survey_responses ORDER BY createdAt DESC');
            }
            $rows = [];
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            if (isset($stmt)) {
                $stmt->close();
            }
            echo json_encode($rows);
        } elseif ($method === 'POST') {
            $raw = file_get_contents('php://input');
            $data = json_decode($raw, true);
            if (!$data) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid JSON']);
                exit;
            }
            try {
             $conn = getDB();
                 $dept = is_array($data['department'] ?? null) ? implode(',', $data['department']) : ($data['department'] ?? '');
                 $clamp = fn($v) => max(1, min(5, intval($v)));
                 $overallSatisfaction = !empty($data['overallSatisfaction']) ? $clamp($data['overallSatisfaction']) : null;
                 $maintenance = !empty($data['maintenance']) ? $clamp($data['maintenance']) : null;
                 $bodywork = !empty($data['bodywork']) ? $clamp($data['bodywork']) : null;
                 $appointment = !empty($data['appointment']) ? $clamp($data['appointment']) : null;
                 $advisor = !empty($data['advisor']) ? $clamp($data['advisor']) : null;
                 $workshopRepair = !empty($data['workshopRepair']) ? $clamp($data['workshopRepair']) : null;
                 $carWash = !empty($data['carWash']) ? $clamp($data['carWash']) : null;
                 $stmt = $conn->prepare('INSERT INTO survey_responses (date, firstName, lastName, phone, licensePlate, branch, department, overallSatisfaction, maintenance, bodywork, appointment, advisor, workshopRepair, carWash, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                 if (!$stmt) {
                     http_response_code(500);
                     echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
                     exit;
                 }
                 $stmt->bind_param('sssssssiisiiiis',
                     $data['date'], $data['firstName'], $data['lastName'], $data['phone'],
                     $data['licensePlate'], $data['branch'], $dept,
                     $overallSatisfaction, $maintenance, $bodywork,
                     $appointment, $advisor, $workshopRepair,
                     $carWash, $data['comments']
                 );
                if (!$stmt->execute()) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Execute failed: ' . $stmt->error]);
                    exit;
                }
                $id = $stmt->insert_id;
                $stmt->close();
                echo json_encode(['id' => $id, 'message' => 'Response saved']);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(['error' => $e->getMessage()]);
            }
        } elseif ($method === 'DELETE') {
            requireAdmin();
            $conn = getDB();
            $conn->query('DELETE FROM survey_responses');
            echo json_encode(['message' => 'All responses deleted', 'affectedRows' => $conn->affected_rows]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case 'stats':
        requireAdmin();
        $conn = getDB();
        $result = $conn->query('SELECT branch, COUNT(*) as count, AVG(overallSatisfaction) as avgSatisfaction FROM survey_responses WHERE overallSatisfaction IS NOT NULL GROUP BY branch');
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;

    case 'export':
        requireAdmin();
        $conn = getDB();
        $result = $conn->query('SELECT * FROM survey_responses ORDER BY createdAt DESC');
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $dept = $row['department'];
            if (strpos($dept, ',') !== false) {
                $map = ['maintenance' => 'Maintenance', 'bodywork' => 'Bodywork'];
                $parts = array_map(function($p) use ($map) {
                    return $map[trim($p)] ?? trim($p);
                }, explode(',', $dept));
                $dept = implode(', ', $parts);
            } else {
                $map = ['maintenance' => 'Maintenance', 'bodywork' => 'Bodywork'];
                $dept = $map[$dept] ?? $dept;
            }
            $rows[] = [
                'Date' => date('Y-m-d', strtotime($row['createdAt'])),
                'First Name' => $row['firstName'],
                'Last Name' => $row['lastName'],
                'Phone' => $row['phone'] ?? '',
                'License Plate' => $row['licensePlate'],
                'Branch' => $row['branch'],
                'Department' => $dept,
                'Overall Satisfaction' => $row['overallSatisfaction'] ?? '',
                'Maintenance' => $row['maintenance'] ?? '',
                'Bodywork' => $row['bodywork'] ?? '',
                'Appointment' => $row['appointment'] ?? '',
                'Advisor' => $row['advisor'] ?? '',
                'Workshop Repair' => $row['workshopRepair'] ?? '',
                'Car Wash' => $row['carWash'] ?? '',
                'Comments' => $row['comments'] ?? ''
            ];
        }
        echo json_encode($rows);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
}
