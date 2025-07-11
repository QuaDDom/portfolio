import React from "react";
import "./globals.css";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default:
      "Mateo Quadrelli - Mejor Desarrollador Full Stack 2025 | Portfolio",
    template: "%s | Mateo Quadrelli - Desarrollador Full Stack",
  },
  description:
    "🚀 Mateo Quadrelli: Desarrollador Full Stack con +3 años de experiencia en React, Next.js, Node.js y UX/UI. Proyectos innovadores para clientes globales desde Buenos Aires. ¡Explora mi portfolio 2025!",
  keywords: [
    "Mateo Quadrelli",
    "Mejor Desarrollador Full Stack Argentina 2025",
    "Top React Developer Buenos Aires",
    "Desarrollador Next.js Argentina",
    "Programador Full Stack Remoto",
    "Desarrollo Web Buenos Aires 2025",
    "React Developer Argentina",
    "Next.js Specialist",
    "TypeScript Expert",
    "UX UI Designer Argentina",
    "Responsive Web Design",
    "Desarrollo Web Personalizado",
    "Aplicaciones Web Modernas",
    "E-commerce Development",
    "SaaS Development",
    "API Development",
    "Best Web Developer 2025",
  ].join(", "),
  authors: [{ name: "Mateo Quadrelli", url: "https://mateoquadrelli.com" }],
  creator: "Mateo Quadrelli",
  publisher: "Mateo Quadrelli",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "https://mateoquadrelli.com",
    siteName: "Mateo Quadrelli - Full Stack Developer",
    title: "Mateo Quadrelli - Mejor Desarrollador Full Stack 2025 | Portfolio",
    description:
      "🚀 Portfolio de Mateo Quadrelli, Desarrollador Full Stack especializado en React, Next.js y UX/UI. ¡Descubre mis proyectos 2025 ahora!",
    images: [
      {
        url: "https://mateoquadrelli.com/og-image-2025.webp",
        width: 1200,
        height: 630,
        alt: "Mateo Quadrelli - Full Stack Developer Portfolio 2025",
        type: "image/webp",
      },
      {
        url: "https://mateoquadrelli.com/og-image-square-2025.webp",
        width: 1200,
        height: 1200,
        alt: "Mateo Quadrelli - Developer Profile",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mateoquadrelli",
    creator: "@mateoquadrelli",
    title: "Mateo Quadrelli - Mejor Desarrollador Full Stack 2025 | Portfolio",
    description:
      "🚀 Explora el portfolio 2025 de Mateo Quadrelli, experto en React, Next.js y UX/UI. ¡Proyectos innovadores desde Buenos Aires!",
    images: {
      url: "https://mateoquadrelli.com/twitter-card-2025.webp",
      alt: "Mateo Quadrelli - Full Stack Developer Portfolio",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  alternates: {
    canonical: "https://mateoquadrelli.com",
    languages: {
      es: "https://mateoquadrelli.com",
      en: "https://mateoquadrelli.com/en",
      it: "https://mateoquadrelli.com/it",
    },
  },
  metadataBase: new URL("https://mateoquadrelli.com"),
  category: "technology",
  classification: "Portfolio, Web Development, Full Stack Development",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js",
  applicationName: "Mateo Quadrelli Portfolio",
  appleWebApp: {
    capable: true,
    title: "Mateo Quadrelli",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "application-name": "Mateo Quadrelli Portfolio",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#3b82f6",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentDate = new Date().toISOString();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/* Enhanced SEO Meta Tags */}
        <meta name="geo.region" content="AR-B" />
        <meta name="geo.placename" content="Buenos Aires, Argentina" />
        <meta name="geo.position" content="-34.6118;-58.3960" />
        <meta name="ICBM" content="-34.6118, -58.3960" />
        <meta name="language" content="Spanish" />
        <meta name="content-language" content="es-AR" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta name="expires" content="never" />
        <meta name="dc.created" content="2025-01-01" />
        <meta name="dc.modified" content={currentDate} />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Optimized Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />

        {/* Standard favicons */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />

        {/* Microsoft tiles */}
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />

        {/* Enhanced Hreflang for multilingual support */}
        <link rel="alternate" href="https://mateoquadrelli.com" hrefLang="es" />
        <link
          rel="alternate"
          href="https://mateoquadrelli.com/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://mateoquadrelli.com/it"
          hrefLang="it"
        />
        <link
          rel="alternate"
          href="https://mateoquadrelli.com"
          hrefLang="x-default"
        />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Additional social media meta tags */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="linkedin:owner" content="mateoquadrelli" />

        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://mateoquadrelli.com/#person",
              name: "Mateo Quadrelli",
              givenName: "Mateo",
              familyName: "Quadrelli",
              jobTitle: "Full Stack Developer",
              description:
                "Desarrollador Full Stack especializado en React, Next.js, Node.js, TypeScript y UX/UI Design con más de 3 años de experiencia",
              url: "https://mateoquadrelli.com",
              image: {
                "@type": "ImageObject",
                url: "https://mateoquadrelli.com/mateo-quadrelli-profile-2025.webp",
                width: 400,
                height: 400,
              },
              sameAs: [
                "https://linkedin.com/in/mateoquadrelli",
                "https://github.com/mateoquadrelli",
                "https://twitter.com/mateoquadrelli",
                "https://instagram.com/mateoquadrelli",
                "https://dev.to/mateoquadrelli",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React.js",
                "Next.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "GraphQL",
                "REST API",
                "Docker",
                "AWS",
                "Vercel",
                "Git",
                "Figma",
                "Adobe XD",
                "UX/UI Design",
                "Responsive Design",
                "SEO",
                "Performance Optimization",
                "Accessibility",
                "E-commerce",
                "SaaS Development",
                "Mobile Development",
                "Progressive Web Apps",
                "Microservices",
                "DevOps",
                "Agile Methodology",
                "Scrum",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Full Stack Developer",
                description:
                  "Especialista en desarrollo de aplicaciones web modernas y experiencias de usuario excepcionales",
                occupationLocation: {
                  "@type": "Country",
                  name: "Argentina",
                },
                skills: [
                  "Full Stack Development",
                  "Frontend Development",
                  "Backend Development",
                  "UX/UI Design",
                  "Database Design",
                  "API Development",
                  "Performance Optimization",
                  "SEO Optimization",
                ],
                experienceRequirements: "3+ years",
                responsibilities: [
                  "Desarrollo de aplicaciones web completas",
                  "Diseño de interfaces de usuario",
                  "Optimización de rendimiento",
                  "Consultoría técnica",
                  "Liderazgo de proyectos",
                ],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
                addressLocality: "Buenos Aires",
                addressRegion: "Buenos Aires",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Universidad Tecnológica",
              },
            }),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mateo Quadrelli Portfolio",
              url: "https://mateoquadrelli.com",
              description:
                "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack especializado en React, Next.js, Node.js y UX/UI Design",
              author: {
                "@type": "Person",
                name: "Mateo Quadrelli",
              },
              inLanguage: ["es-AR", "en-US"],
              copyrightYear: new Date().getFullYear(),
              genre: "Portfolio",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://mateoquadrelli.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Portfolio Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: "Mateo Quadrelli Portfolio 2025",
              creator: {
                "@type": "Person",
                name: "Mateo Quadrelli",
              },
              dateCreated: "2025-01-01",
              dateModified: currentDate,
              inLanguage: "es-AR",
              isPartOf: {
                "@type": "WebSite",
                name: "Mateo Quadrelli Portfolio",
                url: "https://mateoquadrelli.com",
              },
              keywords: [
                "Full Stack Development",
                "Web Development",
                "React",
                "Next.js",
                "Node.js",
                "UX/UI Design",
                "Portfolio 2025",
              ],
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mateoquadrelli.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Portfolio",
                  item: "https://mateoquadrelli.com/portfolio",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Projects",
                  item: "https://mateoquadrelli.com/projects",
                },
              ],
            }),
          }}
        />

        {/* ProfilePage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Mateo Quadrelli",
                description:
                  "Full Stack Developer especializado en React, Next.js, Node.js y UX/UI Design",
                url: "https://mateoquadrelli.com",
              },
            }),
          }}
        />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Mateo Quadrelli - Full Stack Developer",
              description:
                "Servicios de desarrollo web y diseño UX/UI en Buenos Aires, Argentina",
              url: "https://mateoquadrelli.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
                addressLocality: "Buenos Aires",
                addressRegion: "Buenos Aires",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -34.6118,
                longitude: -58.396,
              },
              sameAs: [
                "https://linkedin.com/in/mateoquadrelli",
                "https://github.com/mateoquadrelli",
                "https://twitter.com/mateoquadrelli",
              ],
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Qué servicios ofrece Mateo Quadrelli como desarrollador Full Stack?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mateo ofrece desarrollo web con React, Next.js, Node.js, diseño UX/UI, optimización SEO, desarrollo de APIs y más.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo contactar a Mateo Quadrelli para un proyecto?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Puedes contactar a Mateo a través de su sitio web mateoquadrelli.com o en LinkedIn (@mateoquadrelli).",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/20 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen relative overflow-x-hidden">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/2 to-indigo-500/2 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>

        {/* Theme initialization script */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  let theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    localStorage.setItem('theme', theme);
                  }
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />

        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen relative z-10">
              {children}
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
