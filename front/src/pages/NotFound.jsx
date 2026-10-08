import { Link } from "react-router-dom";
import { House } from "lucide-react";

function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center pr-24 md:pr-40">
            <p className="mb-4 text-7xl font-bold text-cyan-400">404</p>
            <h1 className="mb-4 text-3xl font-bold text-white">
                Page introuvable
            </h1>
            <p className="mb-10 max-w-md text-gray-400">
                La page que tu recherches n'existe pas ou a été déplacée.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
                <House size={18} />
                Retour à l'accueil
            </Link>
        </div>
    );
}

export default NotFound;
