import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "Mateo Quadrelli - Miglior Sviluppatore Full Stack 2025 | Portfolio",
    template: "%s | Mateo Quadrelli - Sviluppatore Full Stack",
  },
  description:
    "🚀 Mateo Quadrelli: Sviluppatore Full Stack con +3 anni di esperienza in React, Next.js, Node.js e UX/UI. Progetti innovativi per clienti globali da Buenos Aires. Esplora il mio portfolio 2025!",
  alternates: {
    canonical: "https://mateoquadrelli.com/it",
    languages: {
      es: "https://mateoquadrelli.com",
      en: "https://mateoquadrelli.com/en",
      it: "https://mateoquadrelli.com/it",
    },
  },
  openGraph: {
    locale: "it_IT",
    alternateLocale: ["es_AR", "en_US"],
    url: "https://mateoquadrelli.com/it",
    title: "Mateo Quadrelli - Miglior Sviluppatore Full Stack 2025 | Portfolio",
    description:
      "🚀 Portfolio professionale con +3 anni di esperienza nello sviluppo Full Stack. Specialista in React, Next.js, Node.js e UX/UI Design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
