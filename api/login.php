<?php
session_start();

header('Content-Type: application/json');

require_once __DIR__ . '/../models/UserModel.php';

use monApp\models\UserModel;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée'
    ]);
    exit;
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Champs requis'
    ]);
    exit;
}

try {
    $userModel = new UserModel();
    $user = $userModel->findByEmail($email);

    if (!$user) {
        echo json_encode([
            'success' => false,
            'message' => 'Utilisateur introuvable'
        ]);
        exit;
    }

    if (!password_verify($password, $user['password'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Mot de passe incorrect'
        ]);
        exit;
    }

    if ($user['role'] !== 'admin') {
        echo json_encode([
            'success' => false,
            'message' => 'Accès refusé'
        ]);
        exit;
    }

    // 🔐 SESSION
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_role'] = $user['role'];

    echo json_encode([
        'success' => true
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur serveur'
    ]);
}
