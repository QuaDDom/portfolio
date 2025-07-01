import React from "react";
import "./globals.css";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Mateo Quadrelli - Full Stack Developer | Desarrollador Web Argentina",
  description:
    "Mateo Quadrelli - Desarrollador Full Stack especializado en React, Node.js y diseño UX/UI. Portfolio profesional con proyectos innovadores en Argentina.",
  keywords:
    "Mateo Quadrelli, Full Stack Developer, React Developer, Node.js, Argentina, Desarrollador Web, Portfolio, JavaScript, TypeScript, UX UI Design",
  authors: [{ name: "Mateo Quadrelli" }],
  creator: "Mateo Quadrelli",
  publisher: "Mateo Quadrelli",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://mateoquadrelli.com",
    title: "Mateo Quadrelli - Full Stack Developer",
    description:
      "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack especializado en crear experiencias digitales excepcionales",
    siteName: "Mateo Quadrelli Portfolio",
    images: [
      {
        url: "https://mateoquadrelli.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mateo Quadrelli - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateo Quadrelli - Full Stack Developer",
    description:
      "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack",
    images: ["https://mateoquadrelli.com/og-image.jpg"],
    creator: "@mateoquadrelli",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://mateoquadrelli.com",
    languages: {
      "es-AR": "https://mateoquadrelli.com",
      "en-US": "https://mateoquadrelli.com/en",
    },
  },
  metadataBase: new URL("https://mateoquadrelli.com"),
  category: "technology",
  classification: "business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fira-code-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.com" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mateo Quadrelli",
              jobTitle: "Full Stack Developer",
              description:
                "Desarrollador Full Stack especializado en React, Node.js y diseño UX/UI",
              url: "https://mateoquadrelli.com",
              image: "https://mateoquadrelli.com/mateo-quadrelli.jpg",
              sameAs: [
                "https://linkedin.com/in/mateoquadrelli",
                "https://github.com/mateoquadrelli",
                "https://twitter.com/mateoquadrelli",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "React",
                "Node.js",
                "Full Stack Development",
                "UX/UI Design",
                "Web Development",
                "Next.js",
                "Tailwind CSS",
                "MongoDB",
                "PostgreSQL",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "AR",
                addressLocality: "Argentina",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Universidad Tecnológica",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Full Stack Developer",
                occupationLocation: {
                  "@type": "Country",
                  name: "Argentina",
                },
                skills: [
                  "React",
                  "Node.js",
                  "TypeScript",
                  "JavaScript",
                  "UX/UI Design",
                ],
              },
            }),
          }}
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mateo Quadrelli Portfolio",
              url: "https://mateoquadrelli.com",
              description:
                "Portfolio profesional de Mateo Quadrelli - Desarrollador Full Stack",
              author: {
                "@type": "Person",
                name: "Mateo Quadrelli",
              },
              inLanguage: ["es-AR", "en-US"],
              copyrightYear: new Date().getFullYear(),
              genre: "Portfolio",
            }),
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mateo Quadrelli" />

        {/* Favicons and icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Additional social media meta tags */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="twitter:site" content="@mateoquadrelli" />
        <meta name="linkedin:owner" content="mateoquadrelli" />
      </head>
      <body className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/20 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen relative overflow-x-hidden">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/2 to-indigo-500/2 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />

          {/* Subtle grid pattern */}
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

        {/* Simplified theme initialization script */}
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
