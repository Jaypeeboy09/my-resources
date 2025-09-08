<?php
// api.php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // Keep or restrict as needed
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204); exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

$action = $payload['action'] ?? null;
$user = $payload['user'] ?? 'guest';

if ($action === 'ping') {
  echo json_encode([
    'ok' => true,
    'message' => "Pong from PHP",
    'timestamp' => time(),
    'user' => $user
  ]);
  exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unknown action']);