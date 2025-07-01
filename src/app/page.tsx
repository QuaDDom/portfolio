"use client";
import React from "react";
import Head from "next/head";
import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

const Page = () => {
  return (
    <>
      <Head>
        <title>
          Mateo Quadrelli - Full Stack Developer | Portfolio 2025 Argentina
        </title>
        <meta
          name="description"
          content="🚀 Portfolio de Mateo Quadrelli - Desarrollador Full Stack con +3 años de experiencia en React, Next.js, Node.js y UX/UI Design. Proyectos reales, testimonios y servicios profesionales en Argentina."
        />
        <meta
          name="keywords"
          content="Mateo Quadrelli, Full Stack Developer Argentina, React Developer, Next.js, Node.js, TypeScript, UX UI Designer, Portfolio 2025, Desarrollador Web"
        />
        <link rel="canonical" href="https://mateoquadrelli.com" />
        <meta
          property="og:title"
          content="Mateo Quadrelli - Full Stack Developer | Portfolio 2025"
        />
        <meta
          property="og:description"
          content="🚀 Portfolio profesional con +3 años de experiencia en desarrollo Full Stack. Especialista en React, Next.js, Node.js y UX/UI Design."
        />
        <meta property="og:url" content="https://mateoquadrelli.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mateo Quadrelli - Full Stack Developer | Portfolio 2025"
        />
        <meta
          name="twitter:description"
          content="🚀 Portfolio profesional con +3 años de experiencia en desarrollo Full Stack. Especialista en React, Next.js, Node.js y UX/UI Design."
        />
      </Head>

      <Navigation />
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        {/* SEO-optimized heading structure */}
        <header className="sr-only">
          <h1>
            Mateo Quadrelli - Full Stack Developer especializado en React,
            Next.js y UX/UI Design
          </h1>
          <p>
            Portfolio profesional 2025 con más de 3 años de experiencia
            desarrollando aplicaciones web modernas en Argentina
          </p>
        </header>

        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}
        <Services />
        <Contact />

        {/* Schema markup for page sections */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Mateo Quadrelli - Portfolio Profesional",
              description:
                "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack",
              url: "https://mateoquadrelli.com",
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
                    name: "Inicio",
                    item: "https://mateoquadrelli.com",
                  },
                ],
              },
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", "h2", ".hero-description"],
              },
            }),
          }}
        />
      </main>
    </>
  );
};

export default Page;
