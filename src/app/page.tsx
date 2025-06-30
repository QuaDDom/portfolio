"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

const Page = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    // SEO optimizations
    if (typeof window !== "undefined") {
      // Update page title dynamically
      document.title =
        "Mateo Quadrelli - Full Stack Developer | Portfolio Profesional";

      // Add structured data for better SEO
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Mateo Quadrelli Portfolio",
        url: "https://mateoquadrelli.com",
        author: {
          "@type": "Person",
          name: "Mateo Quadrelli",
        },
        description:
          "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://mateoquadrelli.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      });
      document.head.appendChild(script);
    }
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
    </>
  );
};

export default Page;
