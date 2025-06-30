"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  const navItems = [
    { name: t("nav.home"), href: "#hero", icon: HiHome },
    { name: t("nav.about"), href: "#about", icon: HiUser },
    { name: t("nav.skills"), href: "#skills", icon: HiLightningBolt },
    { name: t("nav.projects"), href: "#projects", icon: HiCollection },
    { name: t("nav.services"), href: "#services", icon: HiBriefcase },
    { name: t("nav.contact"), href: "#contact", icon: HiMail },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "services",
        "contact",
      ];
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setLanguageOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const handleLanguageToggle = () => {
    setLanguageOpen(!languageOpen);
  };

  const handleLanguageSelect = (lang: (typeof languages)[0]) => {
    setLanguage(lang);
    setLanguageOpen(false);
  };

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
              {/* Logo */}
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

              {/* Desktop Navigation */}
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

              {/* Controls */}
              <div className="flex items-center space-x-2">
                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
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

                {/* Language Dropdown */}
                <div className="relative hidden sm:block">
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
                      {currentLanguage.code.toUpperCase()}
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
                        className="absolute right-0 top-full mt-2 w-36 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl py-2"
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
                              currentLanguage.code === lang.code
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                            role="menuitem"
                            aria-current={
                              currentLanguage.code === lang.code
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

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
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

      {/* Mobile Menu */}
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
                className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } mode`}
                >
                  {theme === "light" ? (
                    <HiMoon className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <HiSun className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span className="text-sm">
                    {theme === "light" ? t("theme.dark") : t("theme.light")}
                  </span>
                </motion.button>

                <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                  <HiGlobeAlt className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {currentLanguage.name}
                  </span>
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
