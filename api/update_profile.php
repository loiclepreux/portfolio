<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => true]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("
        UPDATE profile SET
        firstname = :firstname,
        lastname = :lastname,
        email = :email,
        phone = :phone,
        linkedin_url = :linkedin_url,
        location = :location,
        specialty = :specialty,
        profile_image = :profile_image,
        stack = :stack,
        objective = :objective
        WHERE id = 1
    ");

    $stmt->execute([
        'firstname' => $data['firstname'],
        'lastname' => $data['lastname'],
        'email' => $data['email'],
        'phone' => $data['phone'],
        'linkedin_url' => $data['linkedin_url'],
        'location' => $data['location'],
        'specialty' => $data['specialty'],
        'profile_image' => $data['profile_image'],
        'stack' => $data['stack'],
        'objective' => $data['objective'],
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => 'Erreur serveur']);
}
