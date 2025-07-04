"use client";
import React, { useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import Navigation from "../../components/layout/Navigation";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Skills from "../../components/sections/Skills";
import Services from "../../components/sections/Services";
import Contact from "../../components/sections/Contact";

const EnglishPage = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage({ code: "en", flag: "🇺🇸", name: "English" });
  }, [setLanguage]);

  return (
    <>
      <Navigation />
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        <header className="sr-only">
          <h1>
            Mateo Quadrelli - Full Stack Developer specialized in React, Next.js
            and UX/UI Design
          </h1>
          <p>
            Professional portfolio 2025 with more than 3 years experience
            developing modern web applications in Argentina
          </p>
        </header>

        <Hero />
        <About />
        <Skills />
        <Services />
        <Contact />

        {/* Schema markup for English page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Mateo Quadrelli - Professional Portfolio",
              description:
                "Professional portfolio of Mateo Quadrelli - Full Stack Developer",
              url: "https://mateoquadrelli.com/en",
              inLanguage: "en-US",
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
                    item: "https://mateoquadrelli.com/en",
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

export default EnglishPage;
