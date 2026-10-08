<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header('Location: ../index.php?p=');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <script src="../assets/js/admin.js" defer></script>
</head>

<body class="min-h-screen bg-[#090b10] text-white">

    <main class="mx-auto max-w-7xl px-6 py-10">
        <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <p class="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Administration
                </p>
                <h1 class="text-4xl font-bold text-white">
                    Dashboard
                </h1>
            </div>

            <a
                href="../api/logout.php"
                class="inline-flex items-center justify-center rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-3 font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/10">
                Déconnexion
            </a>
        </div>

        <div class="mb-8 flex flex-wrap gap-3">
            <button
                type="button"
                class="admin-tab-btn rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-black"
                data-tab="profile">
                Profil
            </button>

            <button
                type="button"
                class="admin-tab-btn rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-3 font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
                data-tab="projects">
                Projets
            </button>

            <button
                type="button"
                class="admin-tab-btn rounded-2xl border border-cyan-500/20 bg-white/5 px-5 py-3 font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
                data-tab="skills">
                Skills
            </button>
        </div>

        <!-- PROFIL -->
        <section
            id="tab-profile"
            class="admin-tab-content rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
            <h2 class="mb-8 text-2xl font-semibold text-white">
                Modifier le profil
            </h2>

            <form id="adminProfileForm" class="grid gap-6 md:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm text-gray-300">Prénom</label>
                    <input
                        type="text"
                        name="firstname"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Prénom" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Nom</label>
                    <input
                        type="text"
                        name="lastname"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Nom" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Email" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Téléphone</label>
                    <input
                        type="text"
                        name="phone"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Téléphone" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin_url"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="https://linkedin.com/..." />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Localisation</label>
                    <input
                        type="text"
                        name="location"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Nancy, France" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Spécialité</label>
                    <input
                        type="text"
                        name="specialty"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Développeur Full Stack" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Image profil</label>
                    <input
                        type="text"
                        name="profile_image"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="/assets/img/photo-profil.jpg" />
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm text-gray-300">Stack</label>
                    <input
                        type="text"
                        name="stack"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="HTML, CSS, JavaScript, PHP..." />
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm text-gray-300">Objectif</label>
                    <textarea
                        name="objective"
                        rows="4"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Objectif professionnel"></textarea>
                </div>

                <div class="md:col-span-2">
                    <button
                        type="submit"
                        class="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300">
                        Enregistrer le profil
                    </button>
                    <p id="adminProfileMessage" class="mt-4 hidden text-sm"></p>
                </div>
            </form>
        </section>

        <!-- PROJETS -->
        <section
            id="tab-projects"
            class="admin-tab-content hidden rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
            <h2 class="mb-8 text-2xl font-semibold text-white">
                Gérer les projets
            </h2>

            <form id="adminProjectForm" class="grid gap-6 md:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm text-gray-300">Titre</label>
                    <input
                        type="text"
                        name="title"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Titre du projet" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Type</label>
                    <select
                        name="type"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white">
                        <option value="personal">Personnel</option>
                        <option value="professional">Professionnel</option>
                    </select>
                </div>

                <div class="md:col-span-2">
                    <label class="mb-2 block text-sm text-gray-300">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Description du projet"></textarea>
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Stack</label>
                    <input
                        type="text"
                        name="stack"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="HTML, PHP, CSS, JS" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Image</label>
                    <input
                        type="text"
                        name="image_path"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="/assets/img/logo.png" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Live URL</label>
                    <input
                        type="text"
                        name="live_url"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="https://..." />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">GitHub URL</label>
                    <input
                        type="text"
                        name="github_url"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="https://github.com/..." />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Publié</label>
                    <select
                        name="is_published"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white">
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                    </select>
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Ordre</label>
                    <input
                        type="number"
                        name="sort_order"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="1" />
                </div>

                <div class="md:col-span-2">
                    <button
                        type="submit"
                        class="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300">
                        Ajouter le projet
                    </button>
                    <p id="adminProjectMessage" class="mt-4 hidden text-sm"></p>
                </div>
            </form>

            <div class="mt-10">
                <h3 class="mb-4 text-xl font-semibold text-white">Liste des projets</h3>
                <div id="adminProjectsList" class="space-y-4"></div>
            </div>
        </section>

        <!-- SKILLS -->
        <section
            id="tab-skills"
            class="admin-tab-content hidden rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
            <h2 class="mb-8 text-2xl font-semibold text-white">
                Gérer les skills
            </h2>

            <form id="adminSkillForm" class="grid gap-6 md:grid-cols-2">
                <div>
                    <label class="mb-2 block text-sm text-gray-300">Nom</label>
                    <input
                        type="text"
                        name="name"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="React" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Catégorie</label>
                    <input
                        type="text"
                        name="category"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="Frameworks & Librairies" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Icône</label>
                    <input
                        type="text"
                        name="icon_class"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="fa-brands fa-react" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Couleur</label>
                    <input
                        type="text"
                        name="color"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="#61dafb" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Niveau</label>
                    <input
                        type="number"
                        name="level"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="85" />
                </div>

                <div>
                    <label class="mb-2 block text-sm text-gray-300">Ordre</label>
                    <input
                        type="number"
                        name="sort_order"
                        class="w-full rounded-2xl border border-cyan-500/15 bg-[#0b0d12] px-4 py-3 text-white"
                        placeholder="1" />
                </div>

                <div class="md:col-span-2">
                    <button
                        type="submit"
                        class="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300">
                        Ajouter la skill
                    </button>
                    <p id="adminSkillMessage" class="mt-4 hidden text-sm"></p>
                </div>
            </form>

            <div class="mt-10">
                <h3 class="mb-4 text-xl font-semibold text-white">Liste des skills</h3>
                <div id="adminSkillsList" class="space-y-4"></div>
            </div>
        </section>
    </main>
</body>

</html>