<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/ProfileModel.php';

use monApp\models\ProfileModel;

try {
    $model = new ProfileModel();
    $profile = $model->getProfile();

    echo json_encode($profile, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur'
    ], JSON_UNESCAPED_UNICODE);
}
