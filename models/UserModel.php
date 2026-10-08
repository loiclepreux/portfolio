<?php

namespace monApp\models;

use PDO;

class UserModel
{
    private PDO $db;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/config.php';

        $this->db = new PDO(
            sprintf("mysql:host=%s;dbname=%s;charset=utf8mb4", $config['db_host'], $config['db_name']),
            $config['db_user'],
            $config['db_pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare("
            SELECT id, email, password, role
            FROM users
            WHERE email = :email
            LIMIT 1
        ");

        $stmt->execute(['email' => $email]);

        $user = $stmt->fetch();

        return $user ?: null;
    }
}
