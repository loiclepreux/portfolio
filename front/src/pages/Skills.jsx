import { Code2, Blocks, Database, Wrench } from "lucide-react";
import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaPhp,
    FaReact,
    FaGitAlt,
    FaGithub,
    FaFigma,
    FaCode,
} from "react-icons/fa";
import {
    SiTypescript,
    SiTailwindcss,
    SiSymfony,
    SiMysql,
    SiVite,
} from "react-icons/si";

function Skills() {
    const skillCategories = [
        {
            title: "Languages",
            icon: <Code2 size={22} />,
            items: [
                {
                    name: "HTML",
                    icon: <FaHtml5 size={20} />,
                    description: "Structure et sémantique des pages web",
                    level: 90,
                    accent: "text-orange-400",
                    border: "group-hover:border-orange-400/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.16)]",
                    bar: "bg-orange-400",
                },
                {
                    name: "CSS",
                    icon: <FaCss3Alt size={20} />,
                    description: "Mise en page, responsive et design visuel",
                    level: 85,
                    accent: "text-blue-400",
                    border: "group-hover:border-blue-400/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.16)]",
                    bar: "bg-blue-400",
                },
                {
                    name: "JavaScript",
                    icon: <FaJs size={20} />,
                    description: "Interactions, logique front-end et dynamisme",
                    level: 85,
                    accent: "text-yellow-300",
                    border: "group-hover:border-yellow-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(253,224,71,0.18)]",
                    bar: "bg-yellow-300",
                },
                {
                    name: "TypeScript",
                    icon: <SiTypescript size={20} />,
                    description:
                        "Typage statique pour des projets plus robustes",
                    level: 70,
                    accent: "text-sky-400",
                    border: "group-hover:border-sky-400/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.16)]",
                    bar: "bg-sky-400",
                },
                {
                    name: "PHP",
                    icon: <FaPhp size={20} />,
                    description:
                        "Logique back-end et développement côté serveur",
                    level: 75,
                    accent: "text-indigo-300",
                    border: "group-hover:border-indigo-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(165,180,252,0.16)]",
                    bar: "bg-indigo-300",
                },
            ],
        },
        {
            title: "Frameworks & Libraries",
            icon: <Blocks size={22} />,
            items: [
                {
                    name: "React",
                    icon: <FaReact size={20} />,
                    description: "Création d’interfaces modernes en composants",
                    level: 85,
                    accent: "text-cyan-300",
                    border: "group-hover:border-cyan-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(103,232,249,0.18)]",
                    bar: "bg-cyan-300",
                },
                {
                    name: "Tailwind CSS",
                    icon: <SiTailwindcss size={20} />,
                    description: "Style rapide, utilitaire et responsive",
                    level: 85,
                    accent: "text-sky-300",
                    border: "group-hover:border-sky-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(125,211,252,0.18)]",
                    bar: "bg-sky-300",
                },
                {
                    name: "Symfony",
                    icon: <SiSymfony size={20} />,
                    description:
                        "Framework PHP structuré pour applications web",
                    level: 70,
                    accent: "text-gray-200",
                    border: "group-hover:border-gray-200/30",
                    glow: "group-hover:shadow-[0_0_30px_rgba(229,231,235,0.10)]",
                    bar: "bg-gray-200",
                },
            ],
        },
        {
            title: "Databases",
            icon: <Database size={22} />,
            items: [
                {
                    name: "MySQL",
                    icon: <SiMysql size={20} />,
                    description:
                        "Gestion et exploitation de bases relationnelles",
                    level: 75,
                    accent: "text-blue-300",
                    border: "group-hover:border-blue-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(147,197,253,0.16)]",
                    bar: "bg-blue-300",
                },
                {
                    name: "SQL",
                    icon: <Database size={20} />,
                    description:
                        "Requêtes, jointures et manipulation de données",
                    level: 75,
                    accent: "text-teal-300",
                    border: "group-hover:border-teal-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(94,234,212,0.16)]",
                    bar: "bg-teal-300",
                },
            ],
        },
        {
            title: "Tools",
            icon: <Wrench size={22} />,
            items: [
                {
                    name: "Git",
                    icon: <FaGitAlt size={20} />,
                    description: "Versioning et suivi des modifications",
                    level: 80,
                    accent: "text-orange-300",
                    border: "group-hover:border-orange-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(253,186,116,0.16)]",
                    bar: "bg-orange-300",
                },
                {
                    name: "GitHub",
                    icon: <FaGithub size={20} />,
                    description: "Hébergement de code et collaboration",
                    level: 80,
                    accent: "text-gray-300",
                    border: "group-hover:border-gray-300/30",
                    glow: "group-hover:shadow-[0_0_30px_rgba(209,213,219,0.12)]",
                    bar: "bg-gray-300",
                },
                {
                    name: "VS Code",
                    icon: <FaCode size={20} />,
                    description: "Environnement de développement principal",
                    level: 90,
                    accent: "text-cyan-300",
                    border: "group-hover:border-cyan-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(103,232,249,0.18)]",
                    bar: "bg-cyan-300",
                },
                {
                    name: "Vite",
                    icon: <SiVite size={20} />,
                    description:
                        "Outil moderne de bundling et de développement",
                    level: 75,
                    accent: "text-violet-300",
                    border: "group-hover:border-violet-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(196,181,253,0.16)]",
                    bar: "bg-violet-300",
                },
                {
                    name: "Figma",
                    icon: <FaFigma size={20} />,
                    description: "Maquettes, UI et réflexion visuelle",
                    level: 60,
                    accent: "text-pink-300",
                    border: "group-hover:border-pink-300/40",
                    glow: "group-hover:shadow-[0_0_30px_rgba(249,168,212,0.16)]",
                    bar: "bg-pink-300",
                },
            ],
        },
    ];

    const totalSkills = skillCategories.reduce(
        (acc, category) => acc + category.items.length,
        0,
    );

    return (
        <main className="relative overflow-hidden px-8 py-20 pr-32 md:px-16 md:pr-40">
                <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
                <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

                <section className="relative mb-16">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Skills
                    </p>

                    <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                        Mes compétences
                    </h1>

                    <p className="max-w-3xl text-base leading-8 text-gray-400">
                        Un aperçu des technologies, outils et environnements que
                        j’utilise dans le cadre de mes projets académiques et
                        personnels.
                    </p>

                    <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-cyan-500/10 bg-[#11141c] px-5 py-3 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                        <span className="text-2xl font-bold text-cyan-300">
                            {totalSkills}
                        </span>
                        <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                            technologies utilisées
                        </span>
                    </div>
                </section>

                <div className="relative space-y-14">
                    {skillCategories.map((category) => (
                        <SkillSection
                            key={category.title}
                            title={category.title}
                            icon={category.icon}
                            items={category.items}
                        />
                    ))}
                </div>
        </main>
    );
}

function SkillSection({ title, icon, items }) {
    return (
        <section>
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    {icon}
                </div>

                <h2 className="text-2xl font-semibold text-cyan-300">
                    {title}
                </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </section>
    );
}

function SkillCard({ skill }) {
    return (
        <article
            className={`group relative overflow-hidden rounded-[1.6rem] border border-cyan-500/10 bg-[#11141c] p-6 shadow-[0_0_20px_rgba(0,255,255,0.03)] transition duration-300 hover:-translate-y-1 ${skill.border} ${skill.glow}`}
        >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-2xl transition duration-300"></div>

            <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition duration-300 ${skill.accent}`}
                    >
                        {skill.icon}
                    </div>

                    <div>
                        <h3
                            className={`text-lg font-semibold text-white transition duration-300 ${skill.accent}`}
                        >
                            {skill.name}
                        </h3>
                        <p className="text-sm text-gray-500">Technologie</p>
                    </div>
                </div>

                <p className="mb-4 text-sm leading-7 text-gray-400">
                    {skill.description}
                </p>

                <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
                    <span>Niveau</span>
                    <span>{skill.level}%</span>
                </div>

                <div className="h-2 w-full rounded bg-[#0b0d12]">
                    <div
                        className={`h-2 rounded shadow-[0_0_10px_rgba(255,255,255,0.08)] transition-all duration-1000 ease-out ${skill.bar}`}
                        style={{ width: `${skill.level}%` }}
                    ></div>
                </div>
            </div>
        </article>
    );
}

export default Skills;
