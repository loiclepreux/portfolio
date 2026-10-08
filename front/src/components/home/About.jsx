function About() {
    return (
        <section className="px-8 py-20 md:px-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-[2rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_30px_rgba(0,255,255,0.03)] md:p-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        À propos
                    </p>

                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                        Un parcours construit avec rigueur et progression
                    </h2>

                    <p className="leading-8 text-gray-400">
                        Après plusieurs expériences professionnelles, j’ai
                        décidé de me reconvertir dans le développement web afin
                        de transformer mon goût pour la logique, la création et
                        la structuration en véritable métier. Aujourd’hui, je
                        développe des projets modernes en portant une attention
                        particulière au design, à la clarté du code et à la
                        cohérence globale d’une application.
                    </p>
                </div>

                <div className="rounded-[2rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_30px_rgba(0,255,255,0.03)] md:p-10">
                    <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Profil
                    </p>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-4">
                            <p className="text-sm text-gray-400">Nom</p>
                            <p className="mt-1 font-medium text-white">
                                Loïc Lepreux
                            </p>
                        </div>

                        <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-4">
                            <p className="text-sm text-gray-400">Orientation</p>
                            <p className="mt-1 font-medium text-white">
                                Développement web full stack
                            </p>
                        </div>

                        <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-4">
                            <p className="text-sm text-gray-400">
                                Technos principales
                            </p>
                            <p className="mt-1 font-medium text-white">
                                React, Tailwind, Symfony, PHP, SQL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
