<?php
require_once __DIR__ . '/securite.php'; // session protégée

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

// Anti force brute : 5 erreurs par adresse IP = 15 minutes d'attente
$attente = limite_attente();
if ($attente > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Trop de tentatives. Réessaie dans ' . ceil($attente / 60) . ' minute(s).'
    ]);
    exit;
}

try {
    $userModel = new UserModel();
    $user = $userModel->findByEmail($email);

    // Même message dans tous les cas : on ne dit pas si l'email existe
    if (!$user || !password_verify($password, $user['password']) || $user['role'] !== 'admin') {
        limite_echec();
        echo json_encode([
            'success' => false,
            'message' => 'Identifiants incorrects'
        ]);
        exit;
    }

    // Nouvel identifiant de session à la connexion (anti vol de session)
    limite_reset();
    session_regenerate_id(true);

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
