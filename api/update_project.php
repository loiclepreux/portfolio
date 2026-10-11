<?php
require_once __DIR__ . '/securite.php'; // session protégée
exiger_admin(); // admin connecté + protection CSRF
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/ProjectModel.php';

use monApp\models\ProjectModel;

$data = json_decode(file_get_contents('php://input'), true);
$id = (int) ($data['id'] ?? 0);

if (!$id) {
    echo json_encode(['error' => true, 'message' => 'ID manquant']);
    exit;
}

try {
    $model = new ProjectModel();
    $model->updateProject($id, $data);

    echo json_encode(['success' => true]);
} catch (\Throwable $e) {
    echo json_encode(['error' => true, 'message' => 'Erreur serveur']);
}
