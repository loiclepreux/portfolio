<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/ProjectModel.php';

use monApp\models\ProjectModel;

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['error' => true, 'message' => 'Données invalides']);
    exit;
}

try {
    $model = new ProjectModel();
    $model->createProject($data);

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur'
    ], JSON_UNESCAPED_UNICODE);
}
