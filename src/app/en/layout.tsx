import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mateo Quadrelli - Best Full Stack Developer 2025 | Portfolio",
    template: "%s | Mateo Quadrelli - Full Stack Developer",
  },
  description:
    "🚀 Mateo Quadrelli: Full Stack Developer with +3 years experience in React, Next.js, Node.js and UX/UI. Innovative projects for global clients from Buenos Aires. Explore my 2025 portfolio!",
  alternates: {
    canonical: "https://mateoquadrelli.com/en",
    languages: {
      es: "https://mateoquadrelli.com",
      en: "https://mateoquadrelli.com/en",
      it: "https://mateoquadrelli.com/it",
    },
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: ["es_AR", "it_IT"],
    url: "https://mateoquadrelli.com/en",
    title: "Mateo Quadrelli - Best Full Stack Developer 2025 | Portfolio",
    description:
      "🚀 Professional portfolio with +3 years experience in Full Stack development. Specialist in React, Next.js, Node.js and UX/UI Design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
