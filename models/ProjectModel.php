<?php

namespace monApp\models;

use PDO;
use PDOException;

class ProjectModel
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

    public function getAllProjects(): array
    {
        $stmt = $this->db->query("
            SELECT id, title, description, content, type, universe, status, nature, stack, live_url, github_url, image_path, image_position, is_published, sort_order, created_at
            FROM projects
            ORDER BY type ASC, sort_order ASC
        ");

        return $stmt->fetchAll();
    }

    public function getAllProjectsAdmin(): array
    {
        $stmt = $this->db->query("
        SELECT id, title, description, content, type, universe, status, nature, stack, live_url, github_url, image_path, image_position, is_published, sort_order, created_at
        FROM projects
        ORDER BY type ASC, sort_order ASC
    ");

        return $stmt->fetchAll();
    }

    public function createProject(array $data): void
    {
        $stmt = $this->db->prepare("
            INSERT INTO projects
            (title, description, content, type, universe, status, nature, stack, live_url, github_url, image_path, image_position, is_published, sort_order, created_at)
            VALUES
            (:title, :description, :content, :type, :universe, :status, :nature, :stack, :live_url, :github_url, :image_path, :image_position, :is_published, :sort_order, NOW())
        ");

        $stmt->execute([
            'title'          => $data['title'] ?? '',
            'description'    => $data['description'] ?? '',
            'content'        => $data['content'] ?? null,
            'type'           => $data['type'] ?? 'personal',
            'universe'       => $data['universe'] ?? 'dev',
            'status'         => $data['status'] ?? 'termine',
            'nature'         => self::nature($data),
            'stack'          => $data['stack'] ?? '',
            'live_url'       => ($data['live_url'] ?? '') !== '' ? $data['live_url'] : null,
            'github_url'     => ($data['github_url'] ?? '') !== '' ? $data['github_url'] : null,
            'image_path'     => $data['image_path'] ?? '',
            'image_position' => ($data['image_position'] ?? '') !== '' ? $data['image_position'] : null,
            'is_published'   => $data['is_published'] ?? 1,
            'sort_order'     => $data['sort_order'] ?? 0,
        ]);
    }

    public function updateProject(int $id, array $data): void
    {
        $stmt = $this->db->prepare("
            UPDATE projects SET
                title        = :title,
                description  = :description,
                content      = :content,
                universe     = :universe,
                status       = :status,
                nature       = :nature,
                stack        = :stack,
                live_url     = :live_url,
                github_url   = :github_url,
                image_path   = :image_path,
                image_position = :image_position,
                is_published = :is_published,
                sort_order   = :sort_order
            WHERE id = :id
        ");

        $stmt->execute([
            'id'           => $id,
            'title'        => $data['title'] ?? '',
            'description'  => $data['description'] ?? '',
            'content'      => $data['content'] ?? null,
            'universe'     => $data['universe'] ?? 'dev',
            'status'       => $data['status'] ?? 'termine',
            'nature'       => self::nature($data),
            'stack'        => $data['stack'] ?? '',
            'live_url'     => ($data['live_url'] ?? '') !== '' ? $data['live_url'] : null,
            'github_url'   => ($data['github_url'] ?? '') !== '' ? $data['github_url'] : null,
            'image_path'   => $data['image_path'] ?? '',
            'image_position' => ($data['image_position'] ?? '') !== '' ? $data['image_position'] : null,
            'is_published' => $data['is_published'] ?? 1,
            'sort_order'   => $data['sort_order'] ?? 0,
        ]);
    }

    // Projet fictif (exercice, démo) ou réel (vraiment utilisé) : seules ces valeurs sont acceptées
    private static function nature(array $data): string
    {
        return in_array($data['nature'] ?? '', ['fictif', 'reel'], true) ? $data['nature'] : 'fictif';
    }

    public function deleteProject(int $id): void
    {
        $stmt = $this->db->prepare("
        DELETE FROM projects
        WHERE id = :id
    ");

        $stmt->execute([
            'id' => $id
        ]);
    }
}
