<?php
require_once __DIR__ . '/securite.php'; // session protégée
exiger_admin(); // admin connecté + protection CSRF
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => true, 'message' => 'Accès refusé']);
    exit;
}

require_once __DIR__ . '/../models/SkillModel.php';

use monApp\models\SkillModel;

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => true, 'message' => 'ID manquant']);
    exit;
}

try {
    $model = new SkillModel();
    $model->deleteSkill((int) $id);

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} catch (\Throwable $e) {
    echo json_encode([
        'error' => true,
        'message' => 'Erreur serveur'
    ], JSON_UNESCAPED_UNICODE);
}
