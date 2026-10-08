<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../models/SkillModel.php';

use monApp\models\SkillModel;

try {
    $model = new SkillModel();
    $skills = $model->getAllSkills();

    echo json_encode($skills, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur',
    ], JSON_UNESCAPED_UNICODE);
}