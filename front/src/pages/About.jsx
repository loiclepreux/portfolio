import { BriefcaseBusiness, GraduationCap, UserRound } from "lucide-react";

function About() {
    const experiences = [
        {
            period: "2003 - 2011",
            title: "Armée de Terre",
            subtitle: "Metz, Carcassonne, Lunéville — Fonctionnaire",
            description: [
                "Contrôle et protocole de sécurité de zone sensible.",
                "Communication et transmission de données par voie chiffrée.",
                "Conduite d'engin blindé.",
            ],
        },
        {
            period: "2013 - 2017",
            title: "Taxi Fillières",
            subtitle: "Fillières — Chauffeur",
            description: [
                "Transport de personnes et de malades assis.",
                "Transport scolaire pour le conseil général.",
            ],
        },
        {
            period: "2017 - 2024",
            title: "Arcelor, Vossloh, Wallerich, FB Groupe Luxembourg",
            subtitle: "Ouvrier qualifié",
            description: [
                "Conduite de pont roulant, de locomotive industrielle et de chariot élévateur.",
                "Déchargement, stockage et préparation des marchandises.",
                "Chargement et expédition.",
            ],
        },
        {
            period: "2024 - Aujourd’hui",
            title: "Reconversion développement web",
            subtitle: "Transition professionnelle",
            description: [
                "Début du parcours en développement web.",
                "Formation, projets personnels et montée en compétences.",
            ],
        },
    ];

    const education = [
        {
            period: "2000 - 2002",
            title: "BEP Comptabilité",
            subtitle:
                "Comptabilité, gestion commerciale, secrétariat, économie et droit",
            description: [
                "Outils étudiés : Word, Excel, Access, logiciels de gestion comptable.",
            ],
        },
        {
            period: "2002 - 2003",
            title: "1ère STT (IGC)",
            subtitle:
                "Comptabilité, informatique de gestion, économie et droit des finances",
            description: [
                "Outils étudiés : Word, Excel, Access, logiciels de gestion comptable.",
            ],
        },
        {
            period: "2024 - 2025",
            title: "Développeur Web & Web Mobile (Bac +2)",
            subtitle: "Formation intensive orientée projets",
            description: [
                "Développement front-end et back-end.",
                "Responsive design, PHP/MySQL, gestion de base de données, versioning.",
                "Technos : HTML, CSS, JavaScript, PHP, MySQL.",
            ],
        },
        {
            period: "2025 - 2026",
            title: "Concepteur Développeur d’Applications (Bac +3/+4)",
            subtitle: "Approfondissement architecture et logique applicative",
            description: [
                "Architecture logicielle, POO, UML, API, structures complexes, logique métier.",
                "Technos : POO, JavaScript avancé, SQL, React, Nextjs.",
            ],
        },
    ];

    return (
        <main className="px-8 py-20 pr-32 md:px-16 md:pr-40">
                <section className="mb-20">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        About
                    </p>

                    <h1 className="mb-8 text-4xl font-bold text-white md:text-5xl">
                        À propos de moi
                    </h1>

                    <div className="grid gap-10 xl:grid-cols-[0.5fr_0.46fr]">
                        <div className="rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] pt-8 pb-8 pl-8 pr-5 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                                    <UserRound size={22} />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">
                                    Mon profil
                                </h2>
                            </div>

                            <p className="leading-8 text-gray-400">
                                Après plusieurs années dans un tout autre
                                domaine professionnel, j’ai pris la décision de
                                me reconvertir dans un secteur qui me passionne
                                depuis longtemps : le développement web.
                            </p>

                            <p className="mt-5 leading-8 text-gray-400">
                                Je m'appelle Loïc, et je me suis lancé avec
                                détermination dans cette nouvelle aventure afin
                                de transformer cette passion en véritable projet
                                professionnel.
                            </p>

                            <p className="mt-5 leading-8 text-gray-400">
                                Curieux, rigoureux et créatif, j’aime concevoir
                                des interfaces modernes, dynamiques et
                                intuitives, où le design rencontre la logique.
                                Mon parcours atypique m’a apporté une solide
                                capacité d’adaptation, de la maturité et une
                                vraie envie de progresser.
                            </p>
                        </div>

                        <div className="rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] pt-8 pb-8 pl-8 pr-4 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                            <h2 className="mb-6 text-2xl font-semibold text-white">
                                En résumé
                            </h2>

                            <div className="space-y-4">
                                <InfoCard label="Nom" value="Loïc Lepreux" />
                                <InfoCard
                                    label="Orientation"
                                    value="Développeur Full Stack"
                                />
                                <InfoCard
                                    label="Forces"
                                    value="Rigueur, adaptation, progression, logique"
                                />
                                <InfoCard
                                    label="Stack actuelle"
                                    value="React, Tailwind, Symfony, PHP, SQL"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <VerticalTimeline
                    icon={<BriefcaseBusiness size={22} />}
                    label="Expérience"
                    title="Parcours professionnel"
                    items={experiences}
                />

                <VerticalTimeline
                    icon={<GraduationCap size={22} />}
                    label="Formation"
                    title="Parcours académique"
                    items={education}
                />
        </main>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-cyan-500/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-1 font-medium text-white">{value}</p>
        </div>
    );
}

function VerticalTimeline({ icon, label, title, items }) {
    return (
        <section className="mb-24">
            <div className="mb-12 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    {icon}
                </div>

                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                        {label}
                    </p>
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-cyan-500/20 md:block"></div>

                <div className="space-y-10 md:space-y-16">
                    {items.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={`${item.period}-${item.title}`}
                                className="relative grid grid-cols-1 md:grid-cols-2 md:items-center"
                            >
                                <div className="absolute left-4 top-8 h-4 w-4 rounded-full border-4 border-[#090b10] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)] md:left-1/2 md:-translate-x-1/2"></div>

                                {isLeft ? (
                                    <>
                                        <div className="pl-12 md:pl-6 md:pr-14">
                                            <TimelineCard item={item} />
                                        </div>
                                        <div className="hidden md:block"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hidden md:block"></div>
                                        <div className="pl-12 md:pl-12 md:pr-18">
                                            <TimelineCard item={item} />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function TimelineCard({ item }) {
    return (
        <article className="rounded-[1.6rem] border border-cyan-500/10 bg-[#11141c] p-6 shadow-[0_0_20px_rgba(0,255,255,0.03)] transition duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]">
            <p className="mb-3 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs tracking-widest text-cyan-300">
                {item.period}
            </p>

            <h3 className="text-xl font-semibold text-white">{item.title}</h3>

            <p className="mt-1 text-sm text-gray-400">{item.subtitle}</p>

            <ul className="mt-4 space-y-2">
                {item.description.map((line, index) => (
                    <li key={index} className="flex gap-2 text-gray-400">
                        <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-cyan-400"></span>
                        <span>{line}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default About;
