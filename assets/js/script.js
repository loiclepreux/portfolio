document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM chargé");
    initNavbarActiveState();
    initContactPage();
    loadSkills();
    loadProjects();
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

//////////// pages project //////////////

async function loadProjects() {
    const personalContainer = document.getElementById(
        "personalProjectsContainer",
    );
    const professionalContainer = document.getElementById(
        "professionalProjectsContainer",
    );

    if (!personalContainer || !professionalContainer) return;

    try {
        const response = await fetch("api/project.php");
        const projects = await response.json();

        console.log("projects =", projects);

        personalContainer.innerHTML = "";
        professionalContainer.innerHTML = "";

        const publishedProjects = projects
            .filter((project) => Number(project.is_published) === 1)
            .sort((a, b) => a.sort_order - b.sort_order);

        publishedProjects.forEach((project) => {
            const article = document.createElement("article");

            article.className =
                "group relative overflow-hidden rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] shadow-[0_0_20px_rgba(0,255,255,0.03)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(0,255,255,0.07)]";

            article.innerHTML = `
                <div class="relative h-40 w-full overflow-hidden">
                    <img
                        src="${project.image_path}"
                        alt="${project.title}"
                        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div class="absolute inset-0 bg-gradient-to-t from-[#090b10]/90 via-[#090b10]/30 to-transparent opacity-80 transition duration-300 group-hover:opacity-100"></div>

                    <div class="absolute inset-0 flex items-end justify-between p-4">
                        <p class="translate-y-2 text-sm font-medium tracking-[0.2em] text-cyan-300 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            VOIR LE PROJET
                        </p>

                        <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-black/30 text-cyan-300 opacity-0 transition duration-300 group-hover:opacity-100">
                            ↗
                        </div>
                    </div>
                </div>

                <div class="p-7">
                    <div class="mb-4">
                        <h3 class="text-xl font-semibold text-white">
                            ${project.title}
                        </h3>

                        <p class="mt-2 text-sm tracking-wide text-cyan-400">
                            ${project.stack}
                        </p>
                    </div>

                    <p class="mb-6 text-sm leading-7 text-gray-400">
                        ${project.description}
                    </p>

                    <div class="mb-6 flex flex-wrap gap-2">
                        <span class="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                            ${project.type}
                        </span>
                    </div>

                    <div class="flex gap-3">
                        ${
                            project.live_url
                                ? `<a href="${project.live_url}" target="_blank" class="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300">
                                        Voir le projet
                                    </a>`
                                : ""
                        }
                    </div>
                </div>
            `;

            if (project.type === "professional") {
                professionalContainer.appendChild(article);
            } else {
                personalContainer.appendChild(article);
            }
        });

        if (!personalContainer.innerHTML.trim()) {
            personalContainer.innerHTML = `
                <p class="text-gray-400">Aucun projet personnel publié pour le moment.</p>
            `;
        }

        if (!professionalContainer.innerHTML.trim()) {
            professionalContainer.innerHTML = `
                <p class="text-gray-400">Aucun projet professionnel publié pour le moment.</p>
            `;
        }
    } catch (error) {
        console.error("Erreur projets :", error);

        personalContainer.innerHTML = `
            <p class="text-red-400">Erreur lors du chargement des projets.</p>
        `;
        professionalContainer.innerHTML = `
            <p class="text-red-400">Erreur lors du chargement des projets.</p>
        `;
    }
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
