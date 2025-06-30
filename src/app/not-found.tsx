"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

export default function NotFound() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<"es" | "en">("es");

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  // Detect language from browser or localStorage
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language");
      const browserLanguage = navigator.language.startsWith("en") ? "en" : "es";
      setCurrentLanguage((savedLanguage as "es" | "en") || browserLanguage);
    } catch (error) {
      setCurrentLanguage("es");
    }
  }, []);

  const translations404 = {
    es: {
      title: "404",
      subtitle: "Página No Encontrada",
      description:
        "Parece que te has perdido en el espacio digital. Esta página no existe en nuestra dimensión.",
      homeButton: "Volver al Inicio",
      exploreButton: "Explorar Proyectos",
      searchPlaceholder: "Buscar en el sitio...",
      easterEgg: "¡Has encontrado el código secreto! 🚀",
      coordinates: "Coordenadas: 404.404.404",
      status: "Estado: Perdido en el Espacio",
    },
    en: {
      title: "404",
      subtitle: "Page Not Found",
      description:
        "Looks like you've gotten lost in digital space. This page doesn't exist in our dimension.",
      homeButton: "Back to Home",
      exploreButton: "Explore Projects",
      searchPlaceholder: "Search site...",
      easterEgg: "You found the secret code! 🚀",
      coordinates: "Coordinates: 404.404.404",
      status: "Status: Lost in Space",
    },
  };

  const t = translations404[currentLanguage];

  // Initialize particles and stars
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      setParticles(newParticles);
    };

    const initStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
      setStars(newStars);
    };

    initParticles();
    initStars();

    const handleResize = () => {
      initParticles();
      initStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y:
            (particle.y + particle.vy + window.innerHeight) %
            window.innerHeight,
        }))
      );

      setStars((prev) =>
        prev.map((star) => ({
          ...star,
          opacity: Math.abs(Math.sin(Date.now() * star.twinkleSpeed)),
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami((prev) => {
        const newKonami = [...prev, e.code].slice(-konamiCode.length);
        if (
          newKonami.length === konamiCode.length &&
          newKonami.every((key, index) => key === konamiCode[index])
        ) {
          triggerEasterEgg();
          return [];
        }
        return newKonami;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  }, []);

  const triggerEasterEgg = useCallback(() => {
    alert(t.easterEgg);
    triggerGlitch();
  }, [t.easterEgg, triggerGlitch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              opacity: star.opacity * 0.8,
            }}
          />
        ))}

        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.5)`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glitch 404 */}
          <div className="relative mb-8">
            <h1
              className={`text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none ${
                isGlitching ? "animate-pulse" : ""
              }`}
              style={{
                fontFamily: "Fira Code, monospace",
                textShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                ...(isGlitching && {
                  animation: "glitch 0.3s infinite",
                  textShadow: `
                    2px 0 #ff0000,
                    -2px 0 #00ffff,
                    0 0 30px rgba(59, 130, 246, 0.8)
                  `,
                }),
              }}
              onClick={triggerGlitch}
            >
              {t.title}
            </h1>

            {/* Glitch overlay effects */}
            {isGlitching && (
              <>
                <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping" />
                <div className="absolute inset-0 bg-cyan-500 opacity-20 animate-ping delay-75" />
              </>
            )}
          </div>

          {/* Subtitle with typewriter effect */}
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-gray-300">
            <span className="inline-block animate-pulse">&gt;</span>
            <span className="ml-2 font-mono">{t.subtitle}</span>
            <span className="inline-block animate-ping ml-2">_</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>

          {/* Status Panel */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{t.coordinates}</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="text-sm text-gray-400">{t.status}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="relative z-10">{t.homeButton}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              href="/#projects"
              className="group relative px-8 py-4 border-2 border-gray-600 hover:border-blue-500 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">{t.exploreButton}</span>
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/#search?q=${
                      (e.target as HTMLInputElement).value
                    }`;
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Easter egg hint */}
          <div className="mt-8 text-xs text-gray-600 font-mono">
            <span className="opacity-50">Try: ↑↑↓↓←→←→BA</span>
          </div>
        </div>
      </div>

      {/* CSS for glitch animation */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
}
