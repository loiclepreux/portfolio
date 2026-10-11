<?php
require_once __DIR__ . '/securite.php'; // session protégée

// vider toutes les variables de session
$_SESSION = [];

// détruire la session
session_destroy();

// redirection vers l'accueil
header('Location: ../index.php?p=');
exit;
