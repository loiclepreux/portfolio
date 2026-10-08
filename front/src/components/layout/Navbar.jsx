import { Link, useLocation } from "react-router-dom";
import { House, User, Brain, Briefcase, Mail, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Navbar() {
    const location = useLocation();

    const links = [
        { to: "/", icon: <House size={22} />, label: "Accueil" },
        { to: "/about", icon: <User size={22} />, label: "About" },
        { to: "/skills", icon: <Brain size={22} />, label: "Skills" },
        { to: "/projects", icon: <Briefcase size={22} />, label: "Projects" },
        { to: "/contact", icon: <Mail size={22} />, label: "Contact" },
        {
            external: true,
            href: "https://github.com/loiclepreux",
            icon: <FaGithub size={22} />,
            label: "GitHub",
        },
        {
            external: true,
            href: "https://www.notion.so/LEPREUX-Lo-c-D-veloppeur-Web-Full-Stack-2f1a8c7c0ea6801f8362f02d04d15f45",
            icon: <FileText size={22} />,
            label: "CV",
        },
    ];

    return (
        <aside className="fixed right-0 top-0 z-50 flex h-screen w-24 flex-col items-center justify-center border-l border-cyan-500/10 bg-[#0b0d12]">
            <div className="mb-10 rotate-90 text-xs font-semibold tracking-[0.45em] text-cyan-400">
                LOÏC
            </div>

            <nav className="flex flex-col items-center gap-5">
                {links.map((link, index) => {
                    if (link.external) {
                        return (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={link.label}
                                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                            >
                                {link.icon}
                            </a>
                        );
                    }

                    const active = location.pathname === link.to;

                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            title={link.label}
                            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                                active
                                    ? "border-cyan-400 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                                    : "border-cyan-500/10 bg-white/5 text-gray-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                            }`}
                        >
                            {active && (
                                <span className="absolute -left-2 h-6 w-[3px] rounded bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"></span>
                            )}

                            {link.icon}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Navbar;
