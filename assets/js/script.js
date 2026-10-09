document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM chargé");
    initNavbarActiveState();
    initContactPage();
    loadSkills();
    loadProjects();
    loadCreationDetail();
    loadProfile();
    initLoginModal();
});

function initNavbarActiveState() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get("p") || "home";

    const navLinks = document.querySelectorAll("nav a[data-page]");

    navLinks.forEach((link) => {
        const page = link.dataset.page;

        link.classList.remove(
            "active",
            "border-cyan-400",
            "bg-cyan-500/15",
            "text-cyan-300",
            "shadow-[0_0_20px_rgba(34,211,238,0.18)]",
        );

        link.classList.add("border-cyan-500/10", "bg-white/5", "text-gray-400");

        const oldIndicator = link.querySelector(".active-indicator");
        if (oldIndicator) {
            oldIndicator.remove();
        }

        if (page === currentPage) {
            link.classList.add(
                "active",
                "border-cyan-400",
                "bg-cyan-500/15",
                "text-cyan-300",
                "shadow-[0_0_20px_rgba(34,211,238,0.18)]",
            );

            link.classList.remove(
                "border-cyan-500/10",
                "bg-white/5",
                "text-gray-400",
            );

            const indicator = document.createElement("span");
            indicator.className =
                "active-indicator absolute -left-2 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]";

            link.prepend(indicator);
        }
    });
}

/////////////// login //////////////

function initLoginModal() {
    const openBtn = document.getElementById("open-login-modal");
    const closeBtn = document.getElementById("close-login-modal");
    const modal = document.getElementById("login-modal");
    const form = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    if (!openBtn || !closeBtn || !modal || !form || !message) return;

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("api/login.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            message.classList.remove("hidden");

            if (result.success) {
                message.textContent = "Connexion réussie";
                message.classList.remove("text-red-400");
                message.classList.add("text-cyan-300");

                // 🔥 redirection admin
                window.location.href = "admin/dashboard.php";
            } else {
                message.textContent = result.message;
                message.classList.add("text-red-400");
            }
        } catch (error) {
            message.textContent = "Erreur serveur";
            message.classList.add("text-red-400");
        }
    });
}

/////////// profile ///////////////

async function loadProfile() {
    const profileName = document.getElementById("profileName");
    const profileTitle = document.getElementById("profileTitle");
    const profileSpecialty = document.getElementById("profileSpecialty");
    const profileStack = document.getElementById("profileStack");
    const profileObjective = document.getElementById("profileObjective");
    const profileImage = document.getElementById("profileImage");

    const profileEmail = document.getElementById("profileEmail");
    const profileLinkedin = document.getElementById("profileLinkedin");
    const profileLocation = document.getElementById("profileLocation");
    const profilePhone = document.getElementById("profilePhone");

    if (
        !profileName &&
        !profileTitle &&
        !profileSpecialty &&
        !profileStack &&
        !profileObjective &&
        !profileImage &&
        !profileEmail &&
        !profileLinkedin &&
        !profileLocation &&
        !profilePhone
    ) {
        return;
    }

    try {
        const response = await fetch("api/profile.php");
        const profile = await response.json();

        if (!profile || profile.error) {
            console.error(
                "Erreur profil :",
                profile?.message || "Profil introuvable",
            );
            return;
        }

        if (profileName) {
            profileName.textContent =
                `${profile.firstname || ""} ${profile.lastname || ""}`.trim();
        }

        if (profileTitle) {
            profileTitle.textContent = profile.specialty || "Développeur Web";
        }

        if (profileSpecialty) {
            profileSpecialty.textContent = profile.specialty || "Non renseigné";
        }

        if (profileStack) {
            profileStack.textContent = profile.stack || "Non renseigné";
        }

        if (profileObjective) {
            profileObjective.textContent = profile.objective || "Non renseigné";
        }

        if (profileImage && profile.profile_image) {
            profileImage.src = profile.profile_image.startsWith("/")
                ? profile.profile_image
                : "/" + profile.profile_image;
        }

        if (profileEmail && profile.email) {
            profileEmail.textContent = profile.email;
            profileEmail.href = `mailto:${profile.email}`;
        }

        if (profileLinkedin && profile.linkedin_url) {
            const linkedinUrl = profile.linkedin_url.startsWith("http")
                ? profile.linkedin_url
                : `https://${profile.linkedin_url}`;

            profileLinkedin.textContent = profile.linkedin_url.replace(
                /^https?:\/\//,
                "",
            );
            profileLinkedin.href = linkedinUrl;
        }

        if (profileLocation) {
            profileLocation.textContent = profile.location || "Non renseignée";
        }

        if (profilePhone) {
            profilePhone.textContent = profile.phone || "Non renseigné";
        }
    } catch (error) {
        console.error("Erreur chargement profil :", error);
    }
}

/////////// page skills ///////////

async function loadSkills() {
    const container = document.getElementById("skillsContainer");
    const totalSkills = document.getElementById("totalSkills");

    if (!container) {
        return;
    }

    try {
        const response = await fetch("api/skills.php");
        const skills = await response.json();

        if (totalSkills) {
            totalSkills.innerHTML = `
                <span class="text-2xl font-bold text-cyan-300">${skills.length}</span>
                <span class="text-sm uppercase tracking-[0.2em] text-gray-400">
                    technologies utilisées
                </span>
            `;
        }

        const grouped = {};

        skills.forEach((skill) => {
            if (!grouped[skill.category]) {
                grouped[skill.category] = [];
            }
            grouped[skill.category].push(skill);
        });

        container.innerHTML = "";

        for (const category in grouped) {
            const section = document.createElement("section");
            section.className = "mb-14";

            const header = document.createElement("div");
            header.className = "mb-8 flex items-center gap-3";
            header.innerHTML = `
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    🛠️
                </div>
                <h2 class="text-2xl font-semibold text-cyan-300">${category}</h2>
            `;

            const grid = document.createElement("div");
            grid.className =
                "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center";

            grouped[category].forEach((skill) => {
                const level = skill.level ?? 50;

                const article = document.createElement("article");
                article.className =
                    "rounded-[1.6rem] border border-cyan-500/10 bg-[#11141c] p-6 shadow-[0_0_20px_rgba(0,255,255,0.03)]";

                article.innerHTML = `
                    <div class="mb-4 flex items-center gap-4">
                        <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                            style="color:${skill.color}">
                            <i class="${skill.icon_class} text-lg"></i>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-white">${skill.name}</h3>
                            <p class="text-sm text-gray-500">Technologie</p>
                        </div>
                    </div>

                    <p class="mb-4 text-sm text-gray-400">${skill.category}</p>

                    <div class="mb-1 flex items-center justify-between text-xs text-gray-400">
                        <span>Niveau</span>
                        <span>${level}%</span>
                    </div>

                    <div class="h-2 w-full rounded bg-[#0b0d12]">
                        <div class="h-2 rounded"
                            style="width:${level}%; background:${skill.color}">
                        </div>
                    </div>
                `;

                grid.appendChild(article);
            });

            section.appendChild(header);
            section.appendChild(grid);
            container.appendChild(section);
        }
    } catch (error) {
        console.error("Erreur chargement skills :", error);
        container.innerHTML = `<p class="text-red-400">Erreur lors du chargement des compétences</p>`;
    }
}

//////////// créations //////////////

// Les univers du portfolio : pour en créer un nouveau, ajoute une ligne ici
const UNIVERSES = {
    dev: { label: "Développement", icon: "fa-solid fa-code", color: "#22d3ee" },
    jeu: {
        label: "Création de jeu",
        icon: "fa-solid fa-hammer",
        color: "#fb923c",
    },
    ecriture: {
        label: "Écriture",
        icon: "fa-solid fa-feather-pointed",
        color: "#c084fc",
    },
    gaming: {
        label: "Gaming & live",
        icon: "fa-brands fa-twitch",
        color: "#a78bfa",
    },
    autre: {
        label: "Autres créations",
        icon: "fa-solid fa-screwdriver-wrench",
        color: "#4ade80",
    },
};

const STATUSES = {
    termine: { label: "Terminé", color: "#4ade80" },
    en_cours: { label: "En cours", color: "#facc15" },
    idee: { label: "À venir", color: "#94a3b8" },
};

function getUniverse(key) {
    return UNIVERSES[key] || UNIVERSES.autre;
}

function getStatus(key) {
    return STATUSES[key] || STATUSES.termine;
}

// Sécurité : empêche un texte de la base d'être interprété comme du HTML
function esc(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// Récupère les créations publiées, triées par ordre
async function fetchPublishedCreations() {
    const response = await fetch("api/project.php");
    const projects = await response.json();

    if (!Array.isArray(projects)) {
        throw new Error("Réponse inattendue de l'API");
    }

    return projects
        .filter((p) => Number(p.is_published) === 1)
        .sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
}

// Petite pastille colorée (univers ou statut)
function badge(label, color) {
    return `
        <span class="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.15em]"
            style="color:${color}; border-color:${color}55; background:${color}14;">
            ${esc(label)}
        </span>`;
}

// L'image de la carte, ou un visuel généré si la création n'a pas d'image
function creationVisual(project) {
    const universe = getUniverse(project.universe);

    if (project.image_path) {
        return `
            <img src="${esc(project.image_path)}" alt="${esc(project.title)}"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />`;
    }

    return `
        <div class="flex h-full w-full items-center justify-center"
            style="background: radial-gradient(circle at 30% 20%, ${universe.color}33, transparent 60%), #0b0d12;">
            <i class="${universe.icon} text-5xl" style="color:${universe.color}"></i>
        </div>`;
}

// Fabrique une carte de création
function creationCard(project) {
    const universe = getUniverse(project.universe);
    const status = getStatus(project.status);

    const article = document.createElement("article");
    article.className =
        "group relative overflow-hidden rounded-[1.8rem] border border-white/5 bg-[#11141c] transition duration-300 hover:-translate-y-1";

    article.innerHTML = `
        <a href="index.php?p=creation&id=${encodeURIComponent(project.id)}" class="block">
            <div class="relative h-40 w-full overflow-hidden">
                ${creationVisual(project)}
                <div class="absolute inset-0 bg-gradient-to-t from-[#090b10]/90 via-[#090b10]/20 to-transparent"></div>
            </div>

            <div class="p-7">
                <div class="mb-4 flex flex-wrap gap-2">
                    ${badge(universe.label, universe.color)}
                    ${badge(status.label, status.color)}
                </div>

                <h3 class="text-xl font-semibold text-white">${esc(project.title)}</h3>

                ${project.stack ? `<p class="mt-2 text-sm" style="color:${universe.color}">${esc(project.stack)}</p>` : ""}

                <p class="mt-4 text-sm leading-7 text-gray-400">${esc(project.description)}</p>

                <p class="mt-6 inline-flex items-center gap-2 text-sm font-medium" style="color:${universe.color}">
                    En savoir plus <i class="fa-solid fa-arrow-right text-xs"></i>
                </p>
            </div>
        </a>
    `;

    // La bordure prend la couleur de l'univers au survol
    article.addEventListener("mouseenter", () => {
        article.style.borderColor = `${universe.color}55`;
        article.style.boxShadow = `0 0 28px ${universe.color}22`;
    });
    article.addEventListener("mouseleave", () => {
        article.style.borderColor = "";
        article.style.boxShadow = "";
    });

    return article;
}

async function loadProjects() {
    const doneContainer = document.getElementById("doneCreationsContainer");
    const nextContainer = document.getElementById("nextCreationsContainer");
    const filtersContainer = document.getElementById("universeFilters");

    // On n'est pas sur la page Créations : on ne fait rien
    if (!doneContainer || !nextContainer || !filtersContainer) return;

    let creations;
    try {
        creations = await fetchPublishedCreations();
    } catch (error) {
        console.error("Erreur créations :", error);
        doneContainer.innerHTML = `<p class="text-red-400">Erreur lors du chargement des créations.</p>`;
        return;
    }

    // Les univers qui ont au moins une création
    const usedUniverses = [...new Set(creations.map((c) => c.universe))];

    // Univers actif : lu dans l'adresse (?u=ecriture), sinon "Tout"
    let active = new URLSearchParams(window.location.search).get("u");
    if (!usedUniverses.includes(active)) active = "all";

    // --- Les boutons de filtre ---
    function renderFilters() {
        const buttons = [
            [
                "all",
                {
                    label: "Tout",
                    icon: "fa-solid fa-layer-group",
                    color: "#22d3ee",
                },
            ],
        ].concat(
            Object.entries(UNIVERSES).filter(([key]) =>
                usedUniverses.includes(key),
            ),
        );

        filtersContainer.innerHTML = "";

        buttons.forEach(([key, universe]) => {
            const isActive = key === active;
            const button = document.createElement("button");
            button.type = "button";
            button.className =
                "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition";

            // Bouton actif : plein ; bouton inactif : contour coloré
            button.style.color = isActive ? "#090b10" : universe.color;
            button.style.background = isActive
                ? universe.color
                : "rgba(255,255,255,0.04)";
            button.style.borderColor = isActive
                ? universe.color
                : `${universe.color}40`;
            button.innerHTML = `<i class="${universe.icon}"></i> ${esc(universe.label)}`;

            button.addEventListener("click", () => {
                active = key;

                // Met à jour l'adresse sans recharger la page
                const url = new URL(window.location);
                if (key === "all") url.searchParams.delete("u");
                else url.searchParams.set("u", key);
                history.replaceState(null, "", url);

                renderFilters();
                renderCards();
            });

            filtersContainer.appendChild(button);
        });
    }

    // --- Les cartes ---
    function renderCards() {
        const visible = creations.filter(
            (c) => active === "all" || c.universe === active,
        );
        const done = visible.filter((c) => c.status === "termine");
        const next = visible.filter((c) => c.status !== "termine");

        doneContainer.innerHTML = "";
        nextContainer.innerHTML = "";

        done.forEach((c) => doneContainer.appendChild(creationCard(c)));
        next.forEach((c) => nextContainer.appendChild(creationCard(c)));

        if (!done.length)
            doneContainer.innerHTML = `<p class="text-gray-500">Rien de terminé dans cet univers pour l'instant.</p>`;
        if (!next.length)
            nextContainer.innerHTML = `<p class="text-gray-500">Rien en préparation dans cet univers pour l'instant.</p>`;
    }

    renderFilters();
    renderCards();
}

// Sécurité : n'accepte que les liens http(s) ou les chemins du site
function safeUrl(url) {
    const value = String(url ?? "").trim();
    if (/^https?:\/\//i.test(value) || /^[\w./-]+$/.test(value)) return value;
    return "";
}

async function loadCreationDetail() {
    const container = document.getElementById("creationDetail");

    // On n'est pas sur la page détail : on ne fait rien
    if (!container) return;

    // L'id est dans l'adresse : ?p=creation&id=6
    const id = new URLSearchParams(window.location.search).get("id");

    let creation;
    try {
        const creations = await fetchPublishedCreations();
        creation = creations.find((c) => String(c.id) === String(id));
    } catch (error) {
        console.error("Erreur création :", error);
        container.innerHTML = `<p class="text-red-400">Erreur lors du chargement.</p>`;
        return;
    }

    if (!creation) {
        container.innerHTML = `<p class="text-gray-400">Cette création n'existe pas ou n'est pas encore publiée.</p>`;
        return;
    }

    const universe = getUniverse(creation.universe);
    const status = getStatus(creation.status);
    const link = safeUrl(creation.live_url);

    // Le texte long : une ligne vide = un nouveau paragraphe
    const paragraphs = String(creation.content || "")
        .split(/\n\s*\n/)
        .filter((p) => p.trim())
        .map((p) => `<p>${esc(p.trim()).replaceAll("\n", "<br>")}</p>`)
        .join("");

    // Le titre de l'onglet du navigateur
    document.title = `${creation.title} — Loïc Lepreux`;

    container.innerHTML = `
        <div class="mb-6 flex flex-wrap gap-2">
            ${badge(universe.label, universe.color)}
            ${badge(status.label, status.color)}
        </div>

        <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">${esc(creation.title)}</h1>

        ${creation.stack ? `<p class="mb-8 text-sm" style="color:${universe.color}">${esc(creation.stack)}</p>` : ""}

        <div class="group mb-10 h-64 overflow-hidden rounded-[1.8rem] border border-white/5 md:h-80">
            ${creationVisual(creation)}
        </div>

        <p class="mb-8 text-lg leading-8 text-gray-200">${esc(creation.description)}</p>

        ${paragraphs ? `<div class="space-y-5 leading-8 text-gray-400">${paragraphs}</div>` : ""}

        ${
            link
                ? `
            <a href="${esc(link)}" target="_blank" rel="noopener noreferrer"
                class="mt-10 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-black transition hover:opacity-90"
                style="background:${universe.color}">
                Voir le projet <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>`
                : ""
        }
    `;
}

/////////// page contact //////////

function initContactPage() {
    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    if (!contactForm || !contactMessage) {
        return;
    }

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const subject = formData.get("subject")?.toString().trim();
        const message = formData.get("message")?.toString().trim();

        // 🔹 Vérification
        if (!name || !email || !subject || !message) {
            contactMessage.textContent = "Merci de remplir tous les champs.";
            contactMessage.classList.remove("hidden", "text-cyan-300");
            contactMessage.classList.add("text-red-400");
            return;
        }

        try {
            const response = await fetch("api/contact.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                contactMessage.textContent = "Message envoyé avec succès ✅";
                contactMessage.classList.remove("hidden", "text-red-400");
                contactMessage.classList.add("text-cyan-300");

                contactForm.reset();
            } else {
                contactMessage.textContent =
                    result.message || "Erreur lors de l'envoi ❌";
                contactMessage.classList.remove("hidden", "text-cyan-300");
                contactMessage.classList.add("text-red-400");
            }
        } catch (error) {
            console.error(error);
            contactMessage.textContent = "Erreur serveur ❌";
            contactMessage.classList.remove("hidden", "text-cyan-300");
            contactMessage.classList.add("text-red-400");
        }
    });
}
