<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/ProjectModel.php';

use monApp\models\ProjectModel;

try {
    $model = new ProjectModel();
    $projects = $model->getAllProjectsAdmin();

    echo json_encode($projects, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur'
    ], JSON_UNESCAPED_UNICODE);
}
