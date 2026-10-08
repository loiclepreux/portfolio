<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../models/ProjectModel.php';

use monApp\models\ProjectModel;

try {
    $model = new ProjectModel();
    $projects = $model->getAllProjects();

    echo json_encode($projects, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur',
    ], JSON_UNESCAPED_UNICODE);
}