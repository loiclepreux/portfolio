<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Méthode invalide"]);
    exit;
}

// 🔹 Récupération des données
$name = trim($_POST["name"] ?? '');
$email = trim($_POST["email"] ?? '');
$subject = trim($_POST["subject"] ?? '');
$message = trim($_POST["message"] ?? '');

// 🔹 Vérification simple
if (!$name || !$email || !$message) {
    echo json_encode(["success" => false, "message" => "Champs requis manquants"]);
    exit;
}

// 🔹 Email valide et sans retour à la ligne (empêche l'injection d'en-têtes)
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $name . $subject)) {
    echo json_encode(["success" => false, "message" => "Données invalides"]);
    exit;
}

// 🔹 Ton email (IMPORTANT)
$to = "lepreux.loic@bbox.fr";

// 🔹 Le motif doit faire partie de la liste du formulaire
$allowedSubjects = [
    'Opportunité professionnelle',
    'Projet / collaboration',
    'RELIC FORGE',
    'Les Chroniques de Lorian',
    'Gaming / Twitch',
    'Autre',
];

if (!in_array($subject, $allowedSubjects, true)) {
    $subject = 'Autre';
}

// Ex : "[RELIC FORGE] Message de Julien"
$subject = "[$subject] Message de $name";

// 🔹 Contenu du mail
$body = "Nom : $name\n";
$body .= "Email : $email\n\n";
$body .= "Message :\n$message";

// 🔹 Headers
$headers = "From: Portfolio <" . $to . ">\r\n";
$headers .= "Reply-To: $email\r\n";

// 🔹 Envoi
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur envoi"]);
}
