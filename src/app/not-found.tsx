"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página No Encontrada - 404 | Mateo Quadrelli",
  description:
    "La página que buscas no existe. Explora el portfolio de Mateo Quadrelli - Full Stack Developer con proyectos innovadores y servicios profesionales.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      {/* SEO-optimized structure */}
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Schema markup for 404 page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Página No Encontrada - 404",
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

          {/* Accessible heading structure */}
          <header>
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
              Página No Encontrada
            </h2>
          </header>

          {/* SEO-friendly description */}
          <main>
            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
              La página que buscas no existe. Puede que haya sido movida o
              eliminada. Explora mi portfolio profesional con proyectos
              innovadores y servicios de desarrollo web.
            </p>

            {/* Enhanced navigation with SEO keywords */}
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
                🏠 Volver al Inicio
              </Link>

              <Link
                href="/#projects"
                className="px-8 py-3 border-2 border-gray-600 hover:border-blue-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                aria-label="Ver proyectos de desarrollo web de Mateo Quadrelli"
              >
                🚀 Ver Proyectos
              </Link>

              <Link
                href="/#contact"
                className="px-8 py-3 border-2 border-gray-600 hover:border-green-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                aria-label="Contactar a Mateo Quadrelli para servicios de desarrollo"
              >
                💬 Contacto
              </Link>
            </nav>

            {/* Additional helpful links */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">
                Enlaces Útiles
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  href="/#about"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sobre Mí
                </Link>
                <Link
                  href="/#skills"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Habilidades
                </Link>
                <Link
                  href="/#services"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Servicios
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
