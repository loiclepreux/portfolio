-- Ajoute les univers, statuts et le texte détaillé aux projets
-- (déjà exécuté sur la base Hostinger le 09/10/2026)
ALTER TABLE projects
ADD COLUMN universe VARCHAR(30) NOT NULL DEFAULT 'dev'
AFTER type,
    ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'termine'
AFTER universe,
    ADD COLUMN content TEXT NULL
AFTER description;
ALTER TABLE projects
ADD COLUMN github_url VARCHAR(255) NULL
AFTER live_url;
ALTER TABLE projects
ADD COLUMN image_position VARCHAR(20) NULL
AFTER image_path;
UPDATE projects
SET image_path = '/assets/img/relic-forge.jpg',
    image_position = '50% 72%'
WHERE title = 'RELIC FORGE';