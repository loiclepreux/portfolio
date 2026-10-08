import Hero from "../components/home/Hero";
import About from "../components/home/About";
import SkillsPreview from "../components/home/SkillsPreview";
import ProjectsPreview from "../components/home/ProjectsPreview";

function Home() {
    return (
        <>
            <section className="h-screen pr-32 md:pr-40">
                <Hero />
            </section>
            <div className="pr-32 md:pr-40">
                <About />
                <SkillsPreview />
                <ProjectsPreview />
            </div>
        </>
    );
}

export default Home;
