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

    public function updateProfile(array $data): void
    {
        $stmt = $this->db->prepare("
            UPDATE profile SET
                firstname     = :firstname,
                lastname      = :lastname,
                email         = :email,
                phone         = :phone,
                linkedin_url  = :linkedin_url,
                location      = :location,
                specialty     = :specialty,
                stack         = :stack,
                objective     = :objective,
                profile_image = :profile_image
            WHERE id = 1
        ");

        $stmt->execute([
            'firstname'     => $data['firstname'] ?? '',
            'lastname'      => $data['lastname'] ?? '',
            'email'         => $data['email'] ?? '',
            'phone'         => $data['phone'] ?? '',
            'linkedin_url'  => $data['linkedin_url'] ?? '',
            'location'      => $data['location'] ?? '',
            'specialty'     => $data['specialty'] ?? '',
            'stack'         => $data['stack'] ?? '',
            'objective'     => $data['objective'] ?? '',
            'profile_image' => $data['profile_image'] ?? '',
        ]);
    }
}
