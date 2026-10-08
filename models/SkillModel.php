<?php

namespace monApp\models;

use PDO;
use PDOException;

class SkillModel
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

    public function getAllSkills(): array
    {
        $stmt = $this->db->query("
            SELECT id, name, category, icon_class, color, level, sort_order
            FROM skills
            ORDER BY 
                CASE category
                    WHEN 'Languages' THEN 1
                    WHEN 'Frameworks & Librairies' THEN 2
                    WHEN 'Outils & Versioning' THEN 3
                    WHEN 'Bases de données' THEN 4
                    ELSE 5
                END,
            sort_order ASC
        ");

        return $stmt->fetchAll();
    }

    public function getAllSkillsAdmin(): array
    {
        $stmt = $this->db->query("
        SELECT id, name, category, icon_class, color, level, sort_order
        FROM skills
        ORDER BY
            CASE category
                WHEN 'Languages' THEN 1
                WHEN 'Frameworks & Librairies' THEN 2
                WHEN 'Outils & Versioning' THEN 3
                WHEN 'Bases de données' THEN 4
                ELSE 5
            END,
            sort_order ASC
    ");

        return $stmt->fetchAll();
    }

    public function createSkill(array $data): void
    {
        $stmt = $this->db->prepare("
        INSERT INTO skills
        (name, category, icon_class, color, level, sort_order)
        VALUES
        (:name, :category, :icon_class, :color, :level, :sort_order)
    ");

        $stmt->execute([
            'name' => $data['name'] ?? '',
            'category' => $data['category'] ?? '',
            'icon_class' => $data['icon_class'] ?? '',
            'color' => $data['color'] ?? '',
            'level' => $data['level'] ?? 0,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);
    }

    public function deleteSkill(int $id): void
    {
        $stmt = $this->db->prepare("
        DELETE FROM skills
        WHERE id = :id
    ");

        $stmt->execute([
            'id' => $id
        ]);
    }

    
}
