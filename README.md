# Portfolio — Loïc Lepreux

Portfolio de développeur web Full Stack : présentation, compétences, projets et formulaire de contact, avec un espace d'administration pour gérer le contenu.

## Stack

- **PHP 8** en architecture MVC maison (routeur, dispatcher, contrôleurs, vues)
- **MySQL** via PDO pour les projets, compétences et le profil
- **Tailwind CSS 4** (CLI) pour le style
- **JavaScript vanilla** : chargement des données via une petite API JSON (`api/`)

## Fonctionnalités

- Pages Accueil, À propos, Compétences, Projets et Contact
- Projets et compétences chargés depuis la base de données
- Back-office admin (`admin/dashboard.php`) avec connexion sécurisée (sessions + `password_verify`) pour ajouter, modifier et supprimer projets, compétences et profil
- Formulaire de contact avec validation

## Structure

```
api/          endpoints JSON (projets, compétences, profil, contact, auth)
admin/        tableau de bord d'administration
assets/       CSS, JS, images
config/       configuration (config.php non versionné)
controllers/  contrôleurs de pages et de sections
core/         routeur, dispatcher, moteur de templates, accès BDD
models/       modèles PDO
views/        pages et sections HTML
```

## Installation en local

1. Cloner le dépôt
2. Copier `config/config.example.php` en `config/config.php` et renseigner les accès à la base MySQL
3. Installer les outils CSS : `npm install`
4. Générer le CSS : `npm run build:css` (ou `npm run watch:css` pendant le développement)
5. Lancer un serveur PHP : `php -S localhost:8000`
6. Ouvrir http://localhost:8000

## Auteur

Loïc Lepreux — [LinkedIn](https://www.linkedin.com/in/loic-lepreux) · [GitHub](https://github.com/loiclepreux)
