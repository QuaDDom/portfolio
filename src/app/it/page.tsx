"use client";
import React, { useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import Navigation from "../../components/layout/Navigation";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Skills from "../../components/sections/Skills";
import Services from "../../components/sections/Services";
import Contact from "../../components/sections/Contact";

const ItalianPage = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage({ code: "it", flag: "🇮🇹", name: "Italiano" });
  }, [setLanguage]);

  return (
    <>
      <Navigation />
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        <header className="sr-only">
          <h1>
            Mateo Quadrelli - Sviluppatore Full Stack specializzato in React,
            Next.js e UX/UI Design
          </h1>
          <p>
            Portfolio professionale 2025 con più di 3 anni di esperienza nello
            sviluppo di applicazioni web moderne in Argentina
          </p>
        </header>

        <Hero />
        <About />
        <Skills />
        <Services />
        <Contact />

        {/* Schema markup for Italian page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Mateo Quadrelli - Portfolio Professionale",
              description:
                "Portfolio professionale di Mateo Quadrelli - Sviluppatore Full Stack",
              url: "https://mateoquadrelli.com/it",
              inLanguage: "it-IT",
              mainEntity: {
                "@type": "Person",
                "@id": "https://mateoquadrelli.com/#person",
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://mateoquadrelli.com/it",
                  },
                ],
              },
            }),
          }}
        />
      </main>
    </>
  );
};

export default ItalianPage;
