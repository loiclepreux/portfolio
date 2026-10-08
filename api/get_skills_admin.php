<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/SkillModel.php';

use monApp\models\SkillModel;

try {
    $model = new SkillModel();
    $skills = $model->getAllSkillsAdmin();

    echo json_encode($skills, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur'
    ], JSON_UNESCAPED_UNICODE);
}
