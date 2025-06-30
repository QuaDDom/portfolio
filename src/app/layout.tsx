import React from "react";
import "./globals.css";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
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
            }),
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const root = document.documentElement;
                  
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                    root.setAttribute('data-theme', 'dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light'); 
                    root.style.colorScheme = 'light';
                  }
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen">
              {children}
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
