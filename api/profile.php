<?php

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../models/ProfileModel.php';

use monApp\models\ProfileModel;

try {
    $model = new ProfileModel();
    $profile = $model->getProfile();

    echo json_encode($profile, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur',
    ], JSON_UNESCAPED_UNICODE);
}