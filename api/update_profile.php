<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

// Seul un admin connecté peut modifier le profil
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/ProfileModel.php';

use monApp\models\ProfileModel;

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['error' => true, 'message' => 'Données invalides']);
    exit;
}

try {
    $model = new ProfileModel();
    $model->updateProfile($data);

    echo json_encode(['success' => true]);
} catch (\Throwable $e) {
    echo json_encode(['error' => true, 'message' => 'Erreur serveur']);
}
