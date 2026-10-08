import { useState } from "react";
import axios from "axios";
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Send,
    MessageSquareText,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function Contact() {
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        sujet: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

    function validate() {
        const newErrors = {};
        if (!formData.nom.trim() || formData.nom.trim().length < 2)
            newErrors.nom = "Le nom est requis (minimum 2 caractères).";
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Une adresse email valide est requise.";
        if (!formData.sujet.trim())
            newErrors.sujet = "Le sujet est requis.";
        if (!formData.message.trim() || formData.message.trim().length < 10)
            newErrors.message = "Le message est requis (minimum 10 caractères).";
        return newErrors;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStatus("loading");
        try {
            await axios.post(`${API_URL}/api/contact`, formData);
            setStatus("success");
            setFormData({ nom: "", email: "", sujet: "", message: "" });
        } catch {
            setStatus("error");
        }
    }

    return (
        <main className="px-8 py-20 pr-32 md:px-16 md:pr-40">
            <section className="mb-16">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
                    Contact
                </p>

                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                    Me contacter
                </h1>

                <p className="max-w-3xl text-base leading-8 text-gray-400">
                    Tu peux me contacter pour échanger autour de mon parcours,
                    de mes projets, d'une opportunité, ou simplement pour
                    discuter développement web et conception d'applications.
                </p>
            </section>

            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                <section className="rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                            <MessageSquareText size={22} />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Formulaire de contact
                        </h2>
                    </div>

                    {status === "success" ? (
                        <div className="flex flex-col items-center gap-4 py-12 text-center">
                            <CheckCircle size={48} className="text-cyan-400" />
                            <p className="text-xl font-semibold text-white">
                                Message envoyé !
                            </p>
                            <p className="text-gray-400">
                                Merci pour ton message. Je te répondrai dans les
                                plus brefs délais.
                            </p>
                            <button
                                onClick={() => setStatus(null)}
                                className="mt-4 rounded-2xl border border-cyan-500/20 px-6 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/10"
                            >
                                Envoyer un autre message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <FormField
                                label="Nom"
                                error={errors.nom}
                            >
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    className={`w-full rounded-2xl border bg-[#0b0d12] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 ${errors.nom ? "border-red-500/60" : "border-cyan-500/15"}`}
                                />
                            </FormField>

                            <FormField label="Email" error={errors.email}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Votre email"
                                    className={`w-full rounded-2xl border bg-[#0b0d12] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 ${errors.email ? "border-red-500/60" : "border-cyan-500/15"}`}
                                />
                            </FormField>

                            <FormField label="Sujet" error={errors.sujet}>
                                <input
                                    type="text"
                                    name="sujet"
                                    value={formData.sujet}
                                    onChange={handleChange}
                                    placeholder="Sujet de votre message"
                                    className={`w-full rounded-2xl border bg-[#0b0d12] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 ${errors.sujet ? "border-red-500/60" : "border-cyan-500/15"}`}
                                />
                            </FormField>

                            <FormField label="Message" error={errors.message}>
                                <textarea
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Votre message"
                                    className={`w-full resize-none rounded-2xl border bg-[#0b0d12] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400 ${errors.message ? "border-red-500/60" : "border-cyan-500/15"}`}
                                />
                            </FormField>

                            {status === "error" && (
                                <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    <AlertCircle size={18} />
                                    Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === "loading" ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Send size={18} />
                                )}
                                {status === "loading" ? "Envoi en cours..." : "Envoyer"}
                            </button>
                        </form>
                    )}
                </section>

                <aside className="space-y-6">
                    <div className="rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                        <h2 className="mb-6 text-2xl font-semibold text-white">
                            Informations
                        </h2>

                        <div className="space-y-4">
                            <ContactInfoCard
                                icon={<Mail size={20} />}
                                label="Email"
                                value="lepreux.loic@bbox.fr"
                                href="mailto:lepreux.loic@bbox.fr"
                            />

                            <ContactInfoCard
                                icon={<Phone size={20} />}
                                label="Téléphone"
                                value="06.28.20.79.75"
                                href="tel:+33628207975"
                            />

                            <ContactInfoCard
                                icon={<Linkedin size={20} />}
                                label="LinkedIn"
                                value="linkedin.com/in/loic-lepreux"
                                href="https://www.linkedin.com/in/loic-lepreux"
                            />

                            <ContactInfoCard
                                icon={<Github size={20} />}
                                label="GitHub"
                                value="github.com/loiclepreux"
                                href="https://github.com/loiclepreux"
                            />

                            <ContactInfoCard
                                icon={<MapPin size={20} />}
                                label="Localisation"
                                value="Moselle, France"
                            />
                        </div>
                    </div>

                    <div className="rounded-[1.8rem] border border-cyan-500/10 bg-[#11141c] p-8 shadow-[0_0_20px_rgba(0,255,255,0.03)]">
                        <h2 className="mb-4 text-2xl font-semibold text-white">
                            Disponibilité
                        </h2>

                        <p className="leading-8 text-gray-400">
                            Je suis disponible pour échanger autour d'une
                            opportunité, d'un projet ou d'une collaboration. N'hésite
                            pas à me contacter, je réponds dans les meilleurs délais.
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}

function FormField({ label, error, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm text-gray-300">{label}</label>
            {children}
            {error && (
                <p className="mt-1 text-xs text-red-400">{error}</p>
            )}
        </div>
    );
}

function ContactInfoCard({ icon, label, value, href }) {
    return (
        <div className="flex items-start gap-4 rounded-2xl border border-cyan-500/10 bg-white/5 px-4 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-sm text-gray-400">{label}</p>
                {href ? (
                    <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-1 block truncate font-medium text-white transition hover:text-cyan-300"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="mt-1 font-medium text-white">{value}</p>
                )}
            </div>
        </div>
    );
}

export default Contact;
