"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

// Types
interface CodeSnippet {
  lines: string[];
  theme: string;
}

interface StatItem {
  number: string;
  label: string;
  color: string;
}

interface FloatingIcon {
  icon: string;
  position: string;
  delay: number;
  color: string;
}

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isCodeHovered, setIsCodeHovered] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const controls = useAnimation();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Optimized transforms con mejor performance
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Smooth mouse tracking with spring - configuración optimizada
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(
    () => ({ damping: 30, stiffness: 400, mass: 0.8 }),
    []
  );
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const codeSnippets: CodeSnippet[] = useMemo(
    () => [
      {
        lines: [
          "const developer = {",
          "  name: 'Mateo Quadrelli',",
          "  skills: ['React', 'TypeScript', 'Node.js'],",
          "  passion: 'Innovation & Excellence',",
          "  experience: '3+ years',",
          "  buildAmazing: () => true",
          "};",
          "// Creating digital experiences...",
          "export default developer;",
        ],
        theme: "blue",
      },
      {
        lines: [
          "class CreativeDesigner {",
          "  constructor() {",
          "    this.creativity = Infinity;",
          "    this.vision = 'pixel-perfect';",
          "    this.userFocus = true;",
          "  }",
          "  ",
          "  design() { return 'beauty'; }",
          "  innovate() { return 'tomorrow'; }",
          "}",
          "// Crafting user experiences...",
        ],
        theme: "purple",
      },
      {
        lines: [
          "async function buildTheFuture() {",
          "  const ideas = await getIdeas();",
          "  const solution = transform(ideas);",
          "  const impact = await deploy(solution);",
          "  ",
          "  return {",
          "    success: true,",
          "    impact: 'game-changing'",
          "  };",
          "}",
          "// Building tomorrow, today...",
        ],
        theme: "green",
      },
    ],
    []
  );

  const floatingIcons: FloatingIcon[] = useMemo(
    () => [
      {
        icon: "⚛️",
        position: "-top-2 right-4 sm:right-6 lg:right-8",
        delay: 0,
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: "🚀",
        position: "top-4 sm:top-6 lg:top-8 -right-2",
        delay: 0.5,
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: "💻",
        position: "bottom-4 sm:bottom-6 lg:bottom-8 -left-2",
        delay: 1,
        color: "from-green-500 to-emerald-500",
      },
      {
        icon: "🎨",
        position: "-bottom-2 left-4 sm:left-6 lg:left-8",
        delay: 1.5,
        color: "from-orange-500 to-red-500",
      },
      {
        icon: "⚡",
        position: "top-1/2 -left-3 sm:-left-4 lg:-left-6",
        delay: 2,
        color: "from-yellow-500 to-orange-500",
      },
      {
        icon: "🔥",
        position: "top-1/2 -right-3 sm:-right-4 lg:-right-6",
        delay: 2.5,
        color: "from-red-500 to-pink-500",
      },
    ],
    []
  );

  const statsData: StatItem[] = useMemo(
    () => [
      {
        number: "50+",
        label: t("hero.stats.projects") || "Proyectos",
        color: "from-blue-500 to-cyan-500",
      },
      {
        number: "3+",
        label: t("hero.stats.experience") || "Años exp.",
        color: "from-purple-500 to-pink-500",
      },
      {
        number: "100%",
        label: t("hero.stats.satisfaction") || "Satisfacción",
        color: "from-green-500 to-emerald-500",
      },
    ],
    [t]
  );

  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const newRoles = [
      t("hero.roles.fullstack"),
      t("hero.roles.designer"),
      t("hero.roles.creator"),
      t("hero.roles.innovator"),
    ];
    setRoles(newRoles);
  }, [t]);

  // Optimized mouse tracking con mejor throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (shouldReduceMotion) return;

      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        const dampedX = x * 6;
        const dampedY = y * 6;

        mouseX.set(dampedX);
        mouseY.set(dampedY);
        setMousePosition({ x: dampedX, y: dampedY });
      }
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  // Optimized mouse event con mejor throttling
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement || shouldReduceMotion) return;

    let rafId: number;
    let lastTime = 0;
    const throttleMs = 16; // ~60fps

    const throttledMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime >= throttleMs) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => handleMouseMove(e));
        lastTime = now;
      }
    };

    heroElement.addEventListener("mousemove", throttledMouseMove, {
      passive: true,
    });

    return () => {
      heroElement.removeEventListener("mousemove", throttledMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleMouseMove, shouldReduceMotion]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Optimized typewriter effect con mejor timing
  useEffect(() => {
    if (roles.length === 0) return;

    const currentText = roles[currentRole] || "";
    let timeoutId: NodeJS.Timeout;

    const typeSpeed = 60 + Math.random() * 30;
    const deleteSpeed = 30;
    const pauseTime = 1800;

    if (!isDeleting && displayText.length < currentText.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && displayText.length === currentText.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayText.length > 0) {
      timeoutId = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, currentRole, roles]);

  // Optimized code rotation con mejor timing
  useEffect(() => {
    if (!isCodeHovered && !shouldReduceMotion) {
      const interval = setInterval(() => {
        setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [isCodeHovered, codeSnippets.length, shouldReduceMotion]);

  // Memoized animation variants optimizados
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 15,
          mass: 0.8,
        },
      },
    }),
    []
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      role="banner"
      aria-label={t("hero.ariaLabel") || "Hero section"}
    >
      {/* Section-specific overlay - Restored Original */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-blue-50/20 dark:from-transparent dark:via-gray-900/10 dark:to-blue-950/20"
        aria-hidden="true"
      />

      {/* Enhanced section-specific background elements - Restored Original */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${
              50 + mousePosition.x * 0.03
            }% ${
              50 + mousePosition.y * 0.03
            }%, rgba(59, 130, 246, 0.06) 0%, transparent 60%)`,
          }}
        />

        {!shouldReduceMotion &&
          Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute hidden sm:block"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + i * 8}%`,
                x: mouseXSpring,
                y: mouseYSpring,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
                repeatType: "loop",
              }}
            >
              <div
                className={`w-1 h-1 rounded-full ${
                  i % 4 === 0
                    ? "bg-blue-400/20"
                    : i % 4 === 1
                    ? "bg-purple-400/20"
                    : i % 4 === 2
                    ? "bg-cyan-400/20"
                    : "bg-pink-400/20"
                }`}
              />
            </motion.div>
          ))}
      </div>

      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : y,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                variants={itemVariants}
                className="space-y-4 sm:space-y-6"
              >
                {/* Status Badge - Original Style */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block"
                >
                  <motion.span
                    className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-800 dark:text-green-200 border border-green-200/50 dark:border-green-700/50 shadow-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0)",
                              "0 0 0 8px rgba(34, 197, 94, 0.08)",
                              "0 0 0 16px rgba(34, 197, 94, 0)",
                            ],
                          }
                    }
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                      repeatType: "loop",
                    }}
                  >
                    <motion.span
                      className="w-2 h-2 bg-green-400 rounded-full mr-2"
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: [1, 1.2, 1],
                              opacity: [0.8, 1, 0.8],
                            }
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1],
                        repeatType: "loop",
                      }}
                    />
                    {t("hero.available")}
                  </motion.span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="block text-gray-900 dark:text-white mb-2">
                    {t("hero.greeting")}
                  </span>
                  <motion.span
                    className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent relative cursor-pointer"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }
                    }
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop",
                    }}
                    style={{
                      backgroundSize: "300% 300%",
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    whileHover={{ scale: 1.05 }}
                  >
                    Mateo Quadrelli
                    <AnimatePresence>
                      {isHovering && !shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.span>
                </motion.h1>

                <motion.div variants={itemVariants} className="relative">
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-light h-6 sm:h-8 md:h-10 flex items-center justify-center lg:justify-start">
                    <span className="relative">
                      <motion.span
                        key={displayText}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        className="inline-block"
                      >
                        {displayText}
                      </motion.span>
                      <motion.span
                        className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-gradient-to-b from-blue-600 to-purple-600 ml-1"
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                opacity: [0.3, 1, 0.3],
                                scaleY: [0.8, 1, 0.8],
                              }
                        }
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                          repeatType: "loop",
                        }}
                      />
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light px-4 sm:px-0"
                >
                  {t("hero.description")}
                </motion.p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto hover:shadow-2xl hover:from-blue-700 hover:to-purple-700"
                  aria-label={t("hero.cta.projects")}
                >
                  {/* Efecto de brillo sutil en hover */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Efecto de partículas en hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{t("hero.cta.projects")}</span>
                    <motion.svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                  className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-lg relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto hover:shadow-xl"
                  aria-label={t("hero.cta.contact")}
                >
                  <span className="relative z-10">{t("hero.cta.contact")}</span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>

              {/* Stats - Mobile Optimized */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 px-4 sm:px-0"
              >
                {statsData.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.03,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <span
                        className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.number}
                      </span>
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Code Editor - Mobile Hidden, Tablet+ Visible */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:block hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                <motion.div
                  className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto"
                  style={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotateX: useTransform(
                            mouseYSpring,
                            [-50, 50],
                            [-5, 5]
                          ),
                          rotateY: useTransform(
                            mouseXSpring,
                            [-50, 50],
                            [-5, 5]
                          ),
                        }
                  }
                >
                  <motion.div
                    className="absolute inset-4 rounded-3xl bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-blue-900/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setIsCodeHovered(true)}
                    onMouseLeave={() => setIsCodeHovered(false)}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="absolute inset-3 rounded-2xl bg-gradient-to-br from-gray-900 to-blue-900 text-green-400 font-mono text-[9px] lg:text-[10px] p-3 lg:p-4 overflow-hidden">
                      <motion.div
                        key={currentCodeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-1"
                      >
                        {codeSnippets[currentCodeIndex].lines.map(
                          (line, index) => (
                            <motion.div
                              key={`${currentCodeIndex}-${index}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.3,
                              }}
                              className={`${
                                line.includes("//")
                                  ? "text-gray-500"
                                  : line.includes("const") ||
                                    line.includes("class") ||
                                    line.includes("function")
                                  ? "text-blue-300"
                                  : line.includes("'") || line.includes('"')
                                  ? "text-orange-300"
                                  : line.includes("{") || line.includes("}")
                                  ? "text-yellow-300"
                                  : "text-green-300"
                              }`}
                            >
                              {line}
                            </motion.div>
                          )
                        )}
                      </motion.div>

                      <motion.div
                        className="absolute bottom-4 right-4 w-2 h-3 bg-green-400"
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                opacity: [0, 1, 0],
                                scaleY: [1, 1.2, 1],
                              }
                        }
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Floating Icons - Optimized for smaller screens */}
                  {floatingIcons.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`absolute ${item.position} w-10 h-10 lg:w-14 lg:h-14 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-xl flex items-center justify-center text-lg lg:text-xl cursor-pointer z-20 overflow-hidden`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: shouldReduceMotion ? 0 : [0, -8, 0],
                        rotateY: shouldReduceMotion ? 0 : [0, 5, 0],
                      }}
                      transition={{
                        opacity: {
                          delay: 1 + item.delay,
                          duration: 0.6,
                          ease: "easeOut",
                        },
                        scale: {
                          delay: 1 + item.delay,
                          duration: 0.6,
                          ease: "easeOut",
                        },
                        y: {
                          duration: 4 + item.delay,
                          repeat: Infinity,
                          delay: item.delay,
                          ease: "easeInOut",
                          repeatType: "loop",
                        },
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: shouldReduceMotion ? 0 : 360,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        transition: { duration: 0.4, ease: "easeOut" },
                      }}
                    >
                      <span className="relative z-10">{item.icon}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator con animación optimizada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatType: "loop",
          }}
          className="flex flex-col items-center text-gray-400 dark:text-gray-500 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
          onClick={() => scrollToSection("about")}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          aria-label={t("hero.scroll")}
        >
          <span className="text-xs sm:text-sm mb-2 sm:mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 font-medium">
            {t("hero.scroll")}
          </span>
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center relative overflow-hidden"
            whileHover={{
              borderColor: "#3b82f6",
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                repeatType: "loop",
              }}
              className="w-1 h-2 sm:h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-1 sm:mt-2"
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
