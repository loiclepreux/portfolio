-- Projet fictif (exercice, démo) ou réel (vraiment utilisé)
-- À exécuter une fois dans phpMyAdmin (onglet SQL) sur la base du portfolio
ALTER TABLE projects
ADD COLUMN nature VARCHAR(20) NOT NULL DEFAULT 'fictif'
AFTER status;
