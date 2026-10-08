<?php

namespace monApp\models;

use PDO;
use PDOException;

class ProfileModel
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

    public function getProfile(): array|false
    {
        $stmt = $this->db->query("
            SELECT id, firstname, lastname, email, phone, linkedin_url, location, specialty, objective, stack, profile_image
            FROM profile
            ORDER BY id ASC
            LIMIT 1
        ");

        return $stmt->fetch();
    }
}
