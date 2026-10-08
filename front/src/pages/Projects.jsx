import {
    FolderKanban,
    GraduationCap,
    ExternalLink,
} from "lucide-react";
import hakaiImg from "../assets/logo2.png";
import bmwImg from "../assets/logobmw.png";
import quizImg from "../assets/logoquiz.png";

function Projects() {
    const academicProjects = [
        {
            title: "Portfolio développeur",
            stack: "React • Tailwind",
            image: hakaiImg,
            description:
                "Portfolio personnel destiné à présenter mon parcours, mes compétences et mes projets dans une interface moderne.",
            tags: ["React", "UI", "Responsive"],
            link: null,
        },
        {
            title: "Quiz interactif",
            stack: "HTML • CSS • JavaScript",
            image: bmwImg,
            description:
                "Application de quiz dynamique avec logique d'affichage des questions, gestion du score et interactions utilisateur.",
            tags: ["JavaScript", "Front-end"],
            link: null,
        },
        {
            title: "Application gestion",
            stack: "Symfony • SQL",
            image: quizImg,
            description:
                "Projet académique full stack intégrant base de données, logique métier et interface utilisateur.",
            tags: ["Symfony", "BDD"],
            link: null,
        },
    ];

    return (
        <main className="px-8 py-20 pr-32 md:px-16 md:pr-40">
            <section className="mb-16">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                        <FolderKanban size={22} />
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                            Projects
                        </p>
                        <h1 className="text-4xl font-bold text-white md:text-5xl">
                            Mes projets
                        </h1>
                    </div>
                </div>

                <p className="max-w-3xl text-base leading-8 text-gray-400">
                    Une sélection de projets réalisés dans le cadre de ma
                    formation et de mes travaux personnels afin de développer
                    mes compétences techniques et ma capacité à construire des
                    interfaces modernes.
                </p>
            </section>

            <ProjectSection
                icon={<GraduationCap size={20} />}
                title="Projets académiques"
                projects={academicProjects}
            />
        </main>
    );
}

function ProjectSection({ icon, title, projects }) {
    return (
        <section className="mb-20">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    {icon}
                </div>

                <h2 className="text-2xl font-semibold text-cyan-300">
                    {title}
                </h2>
            </div>

            <div className="grid gap-8 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project }) {
    return (
        <article className="group relative overflow-hidden rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] shadow-[0_0_20px_rgba(0,255,255,0.03)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_28px_rgba(0,255,255,0.07)]">
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b10]/90 via-[#090b10]/30 to-transparent opacity-80 transition duration-300 group-hover:opacity-100"></div>

                {project.link && (
                    <div className="absolute inset-0 flex items-end justify-between p-4">
                        <p className="translate-y-2 text-sm font-medium tracking-[0.2em] text-cyan-300 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            VOIR LE PROJET
                        </p>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-black/30 text-cyan-300 opacity-0 transition duration-300 group-hover:opacity-100">
                            <ExternalLink size={16} />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-7">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        {project.title}
                    </h3>
                    <p className="mt-2 text-sm tracking-wide text-cyan-400">
                        {project.stack}
                    </p>
                </div>

                <p className="mb-6 text-sm leading-7 text-gray-400">
                    {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {project.link ? (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
                    >
                        <ExternalLink size={16} />
                        Voir le projet
                    </a>
                ) : (
                    <button
                        disabled
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-gray-500 border border-white/10"
                        title="Lien bientôt disponible"
                    >
                        Bientôt disponible
                    </button>
                )}
            </div>
        </article>
    );
}

export default Projects;
