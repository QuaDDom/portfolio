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
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage, languages } from "../../contexts/LanguageContext";
import {
  HiHome,
  HiUser,
  HiLightningBolt,
  HiCollection,
  HiBriefcase,
  HiMail,
  HiSun,
  HiMoon,
  HiGlobeAlt,
  HiChevronDown,
} from "react-icons/hi";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLanguageDropdownRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const { theme, toggleTheme, mounted } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  const navItems = useMemo(
    () => [
      { name: t("nav.home") || "Home", href: "#hero", icon: HiHome },
      { name: t("nav.about") || "About", href: "#about", icon: HiUser },
      {
        name: t("nav.skills") || "Skills",
        href: "#skills",
        icon: HiLightningBolt,
      },
      {
        name: t("nav.projects") || "Projects",
        href: "#projects",
        icon: HiCollection,
      },
      {
        name: t("nav.services") || "Services",
        href: "#services",
        icon: HiBriefcase,
      },
      { name: t("nav.contact") || "Contact", href: "#contact", icon: HiMail },
    ],
    [t]
  );

  // Enhanced section detection with intersection observer only
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "services",
      "contact",
    ];

    // Check if we're in the browser environment
    if (typeof window === "undefined") return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    } else {
      // Fallback: use a simple scroll-based detection
      const checkActiveSection = () => {
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      };

      // Initial check
      checkActiveSection();
    }
  }, []);

  // Handle click outside using React refs only
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;

      // Check if click is outside nav but allow clicks inside dropdowns
      if (navRef.current && !navRef.current.contains(target)) {
        setIsOpen(false);
        setLanguageOpen(false);
        setMobileLanguageOpen(false);
        return;
      }

      // Handle desktop language dropdown separately
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(target) &&
        !navRef.current?.contains(target)
      ) {
        setLanguageOpen(false);
      }

      // Don't close mobile language dropdown if clicking inside mobile menu
      // Only close if clicking completely outside the mobile menu
      if (
        mobileLanguageDropdownRef.current &&
        !mobileLanguageDropdownRef.current.contains(target)
      ) {
        // Check if we're clicking inside the mobile menu but outside the language dropdown
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu && mobileMenu.contains(target)) {
          // Click is inside mobile menu but outside language dropdown - close language dropdown
          setMobileLanguageOpen(false);
        }
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setLanguageOpen(false);
          setMobileLanguageOpen(false);
          break;
        case "Tab":
          if (isOpen && event.shiftKey) {
            const focusableElements = navRef.current?.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
              const firstElement = focusableElements[0] as HTMLElement;
              const lastElement = focusableElements[
                focusableElements.length - 1
              ] as HTMLElement;

              if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
              }
            }
          }
          break;
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  // Enhanced scroll-based section detection using scroll position
  const handleSectionUpdate = useCallback(() => {
    if (typeof window === "undefined") return;

    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "services",
      "contact",
    ];
    const scrollPosition = window.scrollY + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Use framer-motion's scroll hook for better performance
  useMotionValueEvent(
    scrollY,
    "change",
    useCallback(
      (latest) => {
        setIsScrolled(latest > 50);
        setIsScrolling(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);

        // Update active section based on scroll position
        handleSectionUpdate();
      },
      [handleSectionUpdate]
    )
  );

  const scrollToSection = useCallback((href: string) => {
    // Check if we're in the browser environment
    if (typeof window === "undefined") return;

    try {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        console.warn(`Element with id "${targetId}" not found`);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }

    setIsOpen(false);
    setMobileLanguageOpen(false);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleLanguageToggle = useCallback(() => {
    setLanguageOpen((prev) => !prev);
  }, []);

  const handleMobileLanguageToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileLanguageOpen((prev) => !prev);
  }, []);

  const handleLanguageSelect = useCallback(
    (lang: (typeof languages)[0], e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      try {
        setLanguage(lang);
        setLanguageOpen(false);
        setMobileLanguageOpen(false);
      } catch (error) {
        console.error("Error setting language:", error);
      }
    },
    [setLanguage]
  );

  const handleThemeToggle = useCallback(() => {
    try {
      toggleTheme();
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  }, [toggleTheme]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setMobileLanguageOpen(false);
  }, []);

  const LoadingSkeleton = () => (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 w-[93%] max-w-5xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 w-10 h-10 animate-pulse" />
              <div className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 w-16 h-10 animate-pulse hidden sm:block" />
              <div className="lg:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 w-10 h-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`fixed top-3 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? "w-[98%] max-w-6xl" : "w-[93%] max-w-5xl"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <motion.div
          className={`relative rounded-2xl transition-all duration-500 ${
            isScrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 shadow-lg"
          }`}
          layout={!shouldReduceMotion}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <motion.button
                  onClick={() => scrollToSection("#hero")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer transition-colors duration-200 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  aria-label="Go to home section"
                >
                  Mateo
                </motion.button>
              </div>

              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.button
                        onClick={() => scrollToSection(item.href)}
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-3 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          activeSection === item.href.substring(1)
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        aria-label={`Go to ${item.name} section`}
                        aria-current={
                          activeSection === item.href.substring(1)
                            ? "page"
                            : undefined
                        }
                      >
                        <span className="relative z-10 flex items-center space-x-2">
                          <IconComponent
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                          <span className="hidden xl:inline">{item.name}</span>
                        </span>

                        {activeSection === item.href.substring(1) && (
                          <motion.div
                            layoutId="activeNavItem"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}

                        <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handleThemeToggle}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
                  disabled={isScrolling}
                >
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : { rotate: theme === "dark" ? 180 : 0 }
                    }
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {theme === "light" ? (
                      <HiMoon className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <HiSun className="w-4 h-4" aria-hidden="true" />
                    )}
                  </motion.div>
                </motion.button>

                <div
                  className="relative hidden sm:block"
                  ref={languageDropdownRef}
                >
                  <motion.button
                    onClick={handleLanguageToggle}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-3 py-2.5 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Select language"
                    aria-expanded={languageOpen}
                    aria-haspopup="true"
                  >
                    <HiGlobeAlt className="w-4 h-4" aria-hidden="true" />
                    <span className="text-xs" aria-hidden="true">
                      {currentLanguage?.code?.toUpperCase() || "EN"}
                    </span>
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : { rotate: languageOpen ? 180 : 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <HiChevronDown className="w-3 h-3" aria-hidden="true" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {languageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute right-0 top-full mt-2 w-36 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl py-2 z-50"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {languages.map((lang) => (
                          <motion.button
                            key={lang.code}
                            whileHover={{
                              backgroundColor: "rgba(156, 163, 175, 0.1)",
                            }}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`w-full px-3 py-2 text-left text-sm transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20 ${
                              currentLanguage?.code === lang.code
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                            role="menuitem"
                            aria-current={
                              currentLanguage?.code === lang.code
                                ? "true"
                                : undefined
                            }
                          >
                            <span className="text-base" aria-hidden="true">
                              {lang.flag}
                            </span>
                            <span className="text-xs">{lang.name}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  onClick={handleMobileMenuToggle}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center relative">
                    <motion.span
                      className="w-4 h-0.5 bg-gray-700 dark:bg-gray-300 block absolute"
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 0 : -4,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.span
                      className="w-4 h-0.5 bg-gray-700 dark:bg-gray-300 block absolute"
                      animate={{
                        opacity: isOpen ? 0 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="w-4 h-0.5 bg-gray-700 dark:bg-gray-300 block absolute"
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? 0 : 4,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-6">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        activeSection === item.href.substring(1)
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      role="menuitem"
                      aria-current={
                        activeSection === item.href.substring(1)
                          ? "page"
                          : undefined
                      }
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
              >
                <motion.button
                  onClick={handleThemeToggle}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
                >
                  {theme === "light" ? (
                    <HiMoon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <HiSun className="w-5 h-5" aria-hidden="true" />
                  )}
                  <span className="font-medium">
                    {theme === "light"
                      ? t("theme.dark") || "Dark Mode"
                      : t("theme.light") || "Light Mode"}
                  </span>
                </motion.button>

                <div className="relative" ref={mobileLanguageDropdownRef}>
                  <motion.button
                    onClick={handleMobileLanguageToggle}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Select language"
                    aria-expanded={mobileLanguageOpen}
                    aria-haspopup="true"
                  >
                    <div className="flex items-center space-x-3">
                      <HiGlobeAlt className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">
                        {currentLanguage?.name || "English"}
                      </span>
                    </div>
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : { rotate: mobileLanguageOpen ? 180 : 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <HiChevronDown className="w-4 h-4" aria-hidden="true" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {mobileLanguageOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl py-2 z-50"
                        role="menu"
                        aria-orientation="vertical"
                        onClick={(e: any) => e.stopPropagation()}
                      >
                        {languages.map((lang) => (
                          <motion.button
                            key={lang.code}
                            whileHover={{
                              backgroundColor: "rgba(156, 163, 175, 0.1)",
                            }}
                            onClick={(e: any) => handleLanguageSelect(lang, e)}
                            className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center space-x-3 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20 ${
                              currentLanguage?.code === lang.code
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                            role="menuitem"
                            aria-current={
                              currentLanguage?.code === lang.code
                                ? "true"
                                : undefined
                            }
                          >
                            <span className="text-lg" aria-hidden="true">
                              {lang.flag}
                            </span>
                            <span className="font-medium">{lang.name}</span>
                            {currentLanguage?.code === lang.code && (
                              <span className="ml-auto text-blue-600 dark:text-blue-400">
                                ✓
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
