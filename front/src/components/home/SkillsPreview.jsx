import { Link } from "react-router-dom";

const skills = ["React", "Tailwind", "Symfony", "PHP"];

function SkillsPreview() {
    return (
        <section className="px-8 py-12 md:px-16">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Skills
                    </p>
                    <h2 className="text-3xl font-bold text-white">
                        Aperçu compétences
                    </h2>
                </div>

                <Link
                    to="/skills"
                    className="rounded-xl border border-cyan-500/20 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/10"
                >
                    Voir plus
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {skills.map((skill) => (
                    <div
                        key={skill}
                        className="rounded-[1.5rem] border border-cyan-500/10 bg-[#11141c] p-5 text-center"
                    >
                        <p className="text-lg font-semibold text-cyan-300">
                            {skill}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SkillsPreview;
