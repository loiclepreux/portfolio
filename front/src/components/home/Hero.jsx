import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Mail } from "lucide-react";

function Hero() {
    return (
        <section className="relative flex h-full items-center overflow-hidden px-8 md:px-16">
            <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                        </span>
                        Disponible pour une opportunité
                    </div>

                    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-400">
                        Portfolio développeur
                    </p>

                    <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
                        Loïc <span className="text-cyan-400">Lepreux</span>
                    </h1>

                    <h2 className="mb-4 text-xl font-medium text-gray-200 md:text-2xl">
                        Développeur Full Stack
                    </h2>

                    <p className="mb-6 max-w-2xl text-sm leading-7 text-gray-400 md:text-base md:leading-8">
                        Je conçois des applications web modernes, du front-end
                        au back-end, avec une attention particulière portée au
                        design, à la structure du code et à la logique métier.
                    </p>

                    <div className="mb-10 flex flex-wrap gap-3">
                        <span className="rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                            React
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                            Tailwind
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                            Symfony
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                            PHP
                        </span>
                        <span className="rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                            SQL
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
                        >
                            <Briefcase size={18} />
                            Voir mes projets
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-white/5 px-6 py-3 font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
                        >
                            <Mail size={18} />
                            Me contacter
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[340px]">
                        <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-2xl"></div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-b from-[#131722] to-[#0b0d12] p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
                            <div className="mb-8 flex justify-center">
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-4xl font-bold text-cyan-300">
                                    L
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-2xl font-semibold text-white">
                                    Loïc Lepreux
                                </p>
                                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gray-400">
                                    Full Stack Developer
                                </p>
                            </div>

                            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                        Spécialité
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        Front-end & Full Stack
                                    </p>
                                </div>

                                <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                        Stack
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        React, Tailwind, Symfony
                                    </p>
                                </div>

                                <div className="rounded-xl border border-cyan-500/10 bg-white/5 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                                        Objectif
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        Construire des projets propres et
                                        solides
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/about"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                            >
                                Découvrir mon parcours
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
