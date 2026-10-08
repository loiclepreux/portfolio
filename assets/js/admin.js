document.addEventListener("DOMContentLoaded", () => {
    initAdminTabs();
    loadAdminProfile();
    initProfileForm();

    loadAdminProjects();
    initProjectForm();

    loadAdminSkills();
    initSkillForm();
});

function initAdminTabs() {
    const buttons = document.querySelectorAll(".admin-tab-btn");
    const sections = document.querySelectorAll(".admin-tab-content");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.tab;

            sections.forEach((section) => {
                section.classList.add("hidden");
            });

            buttons.forEach((btn) => {
                btn.classList.remove("bg-cyan-400", "text-black");
                btn.classList.add(
                    "border",
                    "border-cyan-500/20",
                    "bg-white/5",
                    "text-cyan-300",
                );
            });

            document.getElementById(`tab-${target}`).classList.remove("hidden");

            button.classList.remove(
                "border",
                "border-cyan-500/20",
                "bg-white/5",
                "text-cyan-300",
            );
            button.classList.add("bg-cyan-400", "text-black");
        });
    });
}

async function loadAdminProfile() {
    try {
        const res = await fetch("../api/get_profile_admin.php");
        const profile = await res.json();

        if (!profile || profile.error) return;

        const form = document.getElementById("adminProfileForm");

        form.firstname.value = profile.firstname || "";
        form.lastname.value = profile.lastname || "";
        form.email.value = profile.email || "";
        form.phone.value = profile.phone || "";
        form.linkedin_url.value = profile.linkedin_url || "";
        form.location.value = profile.location || "";
        form.specialty.value = profile.specialty || "";
        form.profile_image.value = profile.profile_image || "";
        form.stack.value = profile.stack || "";
        form.objective.value = profile.objective || "";
    } catch (e) {
        console.error("Erreur chargement profil admin", e);
    }
}

function initProfileForm() {
    const form = document.getElementById("adminProfileForm");
    const message = document.getElementById("adminProfileMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        try {
            const res = await fetch("../api/update_profile.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                message.textContent = "Profil mis à jour ✔";
                message.classList.remove("hidden");
                message.classList.add("text-green-400");
            } else {
                message.textContent = "Erreur ❌";
                message.classList.remove("hidden");
                message.classList.add("text-red-400");
            }
        } catch (err) {
            console.error(err);
        }
    });
}

async function loadAdminProjects() {
    const container = document.getElementById("adminProjectsList");

    if (!container) return;

    try {
        const response = await fetch("../api/get_project_admin.php");
        const projects = await response.json();

        if (projects.error) {
            container.innerHTML = `<p class="text-red-400">${projects.message}</p>`;
            return;
        }

        container.innerHTML = "";

        if (!projects.length) {
            container.innerHTML = `<p class="text-gray-400">Aucun projet enregistré.</p>`;
            return;
        }

        projects.forEach((project) => {
            const card = document.createElement("div");

            card.className =
                "rounded-2xl border border-cyan-500/10 bg-white/5 p-5";

            card.innerHTML = `
                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h4 class="text-lg font-semibold text-white">${project.title}</h4>
                        <p class="mt-1 text-sm text-cyan-300">${project.type}</p>
                        <p class="mt-3 text-sm text-gray-400">${project.description}</p>
                        <p class="mt-3 text-sm text-gray-500">Stack : ${project.stack}</p>
                        <p class="mt-1 text-sm text-gray-500">Ordre : ${project.sort_order}</p>
                        <p class="mt-1 text-sm text-gray-500">Publié : ${project.is_published == 1 ? "Oui" : "Non"}</p>
                    </div>

                    <div class="flex gap-3">
                        <button
                            type="button"
                            class="delete-project-btn rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                            data-id="${project.id}"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        initDeleteProjectButtons();
    } catch (error) {
        console.error("Erreur chargement projets admin :", error);
        container.innerHTML = `<p class="text-red-400">Erreur lors du chargement.</p>`;
    }
}

function initProjectForm() {
    const form = document.getElementById("adminProjectForm");
    const message = document.getElementById("adminProjectMessage");

    if (!form || !message) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch("../api/create_project.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            message.classList.remove(
                "hidden",
                "text-red-400",
                "text-green-400",
            );

            if (result.success) {
                message.textContent = "Projet ajouté avec succès.";
                message.classList.add("text-green-400");
                form.reset();
                loadAdminProjects();
            } else {
                message.textContent =
                    result.message || "Erreur lors de l'ajout.";
                message.classList.add("text-red-400");
            }
        } catch (error) {
            console.error("Erreur ajout projet :", error);
            message.classList.remove("hidden");
            message.textContent = "Erreur serveur.";
            message.classList.add("text-red-400");
        }
    });
}

function initDeleteProjectButtons() {
    const buttons = document.querySelectorAll(".delete-project-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;

            if (!confirm("Supprimer ce projet ?")) {
                return;
            }

            try {
                const response = await fetch("../api/delete_project.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                const result = await response.json();

                if (result.success) {
                    loadAdminProjects();
                } else {
                    alert(result.message || "Erreur lors de la suppression.");
                }
            } catch (error) {
                console.error("Erreur suppression projet :", error);
            }
        });
    });
}

async function loadAdminSkills() {
    const container = document.getElementById("adminSkillsList");

    if (!container) return;

    try {
        const response = await fetch("../api/get_skills_admin.php");
        const skills = await response.json();

        if (skills.error) {
            container.innerHTML = `<p class="text-red-400">${skills.message}</p>`;
            return;
        }

        container.innerHTML = "";

        if (!skills.length) {
            container.innerHTML = `<p class="text-gray-400">Aucune skill enregistrée.</p>`;
            return;
        }

        skills.forEach((skill) => {
            const card = document.createElement("div");

            card.className =
                "rounded-2xl border border-cyan-500/10 bg-white/5 p-5";

            card.innerHTML = `
                <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <div class="flex items-center gap-3">
                            <i class="${skill.icon_class}" style="color:${skill.color};"></i>
                            <h4 class="text-lg font-semibold text-white">${skill.name}</h4>
                        </div>

                        <p class="mt-2 text-sm text-cyan-300">${skill.category}</p>
                        <p class="mt-2 text-sm text-gray-500">Niveau : ${skill.level}%</p>
                        <p class="mt-1 text-sm text-gray-500">Ordre : ${skill.sort_order}</p>
                        <p class="mt-1 text-sm text-gray-500">Couleur : ${skill.color}</p>
                    </div>

                    <div class="flex gap-3">
                        <button
                            type="button"
                            class="delete-skill-btn rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                            data-id="${skill.id}"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        initDeleteSkillButtons();
    } catch (error) {
        console.error("Erreur chargement skills admin :", error);
        container.innerHTML = `<p class="text-red-400">Erreur lors du chargement.</p>`;
    }
}

function initDeleteSkillButtons() {
    const buttons = document.querySelectorAll(".delete-skill-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;

            if (!confirm("Supprimer cette skill ?")) {
                return;
            }

            try {
                const response = await fetch("../api/delete_skill.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                const result = await response.json();

                if (result.success) {
                    loadAdminSkills();
                } else {
                    alert(result.message || "Erreur lors de la suppression.");
                }
            } catch (error) {
                console.error("Erreur suppression skill :", error);
            }
        });
    });
}

function initSkillForm() {
    const form = document.getElementById("adminSkillForm");
    const message = document.getElementById("adminSkillMessage");

    if (!form || !message) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch("../api/create_skill.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            message.classList.remove(
                "hidden",
                "text-red-400",
                "text-green-400",
            );

            if (result.success) {
                message.textContent = "Skill ajoutée avec succès.";
                message.classList.add("text-green-400");
                form.reset();
                loadAdminSkills();
            } else {
                message.textContent =
                    result.message || "Erreur lors de l'ajout.";
                message.classList.add("text-red-400");
            }
        } catch (error) {
            console.error("Erreur ajout skill :", error);
            message.classList.remove("hidden");
            message.textContent = "Erreur serveur.";
            message.classList.add("text-red-400");
        }
    });
}
