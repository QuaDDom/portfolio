"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

// Traducciones para la página 404
const notFoundTranslations = {
  es: {
    title: "Página No Encontrada - 404",
    heading: "404",
    subheading: "Página No Encontrada",
    description:
      "La página que buscas no existe. Puede que haya sido movida o eliminada. Explora mi portfolio profesional con proyectos innovadores y servicios de desarrollo web.",
    homeButton: "🏠 Volver al Inicio",
    projectsButton: "🚀 Ver Proyectos",
    contactButton: "💬 Contacto",
    usefulLinks: "Enlaces Útiles",
    about: "Sobre Mí",
    skills: "Habilidades",
    services: "Servicios",
  },
  en: {
    title: "Page Not Found - 404",
    heading: "404",
    subheading: "Page Not Found",
    description:
      "The page you're looking for doesn't exist. It may have been moved or deleted. Explore my professional portfolio with innovative projects and web development services.",
    homeButton: "🏠 Back to Home",
    projectsButton: "🚀 View Projects",
    contactButton: "💬 Contact",
    usefulLinks: "Useful Links",
    about: "About Me",
    skills: "Skills",
    services: "Services",
  },
  it: {
    title: "Pagina Non Trovata - 404",
    heading: "404",
    subheading: "Pagina Non Trovata",
    description:
      "La pagina che stai cercando non esiste. Potrebbe essere stata spostata o eliminata. Esplora il mio portfolio professionale con progetti innovativi e servizi di sviluppo web.",
    homeButton: "🏠 Torna alla Home",
    projectsButton: "🚀 Vedi Progetti",
    contactButton: "💬 Contatto",
    usefulLinks: "Link Utili",
    about: "Chi Sono",
    skills: "Competenze",
    services: "Servizi",
  },
};

export default function NotFound() {
  const { currentLanguage } = useLanguage();
  const t =
    notFoundTranslations[
      currentLanguage?.code as keyof typeof notFoundTranslations
    ] || notFoundTranslations.es;

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Schema markup for 404 page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: t.title,
                description: "Error 404 - La página solicitada no existe",
                url: typeof window !== "undefined" ? window.location.href : "",
                isPartOf: {
                  "@type": "WebSite",
                  name: "Mateo Quadrelli Portfolio",
                  url: "https://mateoquadrelli.com",
                },
              }),
            }}
          />

          <header>
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
              {t.heading}
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
              {t.subheading}
            </h2>
          </header>

          <main>
            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
              {t.description}
            </p>

            <nav
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              role="navigation"
              aria-label="Navegación de error 404"
            >
              <Link
                href="/"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                aria-label="Volver al inicio del portfolio de Mateo Quadrelli"
              >
                {t.homeButton}
              </Link>

              <Link
                href="/#projects"
                className="px-8 py-3 border-2 border-gray-600 hover:border-blue-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                aria-label="Ver proyectos de desarrollo web de Mateo Quadrelli"
              >
                {t.projectsButton}
              </Link>

              <Link
                href="/#contact"
                className="px-8 py-3 border-2 border-gray-600 hover:border-green-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                aria-label="Contactar a Mateo Quadrelli para servicios de desarrollo"
              >
                {t.contactButton}
              </Link>
            </nav>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">
                {t.usefulLinks}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  href="/#about"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t.about}
                </Link>
                <Link
                  href="/#skills"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t.skills}
                </Link>
                <Link
                  href="/#services"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t.services}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
