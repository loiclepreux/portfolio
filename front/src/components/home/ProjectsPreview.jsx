import { Link } from "react-router-dom";

const projects = ["Portfolio développeur", "Projet BMW", "Projet full stack"];

function ProjectsPreview() {
    return (
        <section className="px-8 py-12 md:px-16">
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Projects
                    </p>
                    <h2 className="text-3xl font-bold text-white">
                        Aperçu projets
                    </h2>
                </div>

                <Link
                    to="/projects"
                    className="rounded-xl border border-cyan-500/20 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/10"
                >
                    Voir plus
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project}
                        className="rounded-[1.5rem] border border-cyan-500/10 bg-[#11141c] p-6"
                    >
                        <p className="text-xl font-semibold text-white">
                            {project}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectsPreview;
