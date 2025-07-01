"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiExternalLink,
  HiHeart,
  HiArrowUp,
} from "react-icons/hi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Navegación",
      links: [
        { name: "Inicio", href: "#hero" },
        { name: "Sobre Mí", href: "#about" },
        { name: "Habilidades", href: "#skills" },
        { name: "Proyectos", href: "#projects" },
        { name: "Servicios", href: "#services" },
        { name: "Contacto", href: "#contact" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { name: "Desarrollo Web", href: "#services" },
        { name: "Aplicaciones Móviles", href: "#services" },
        { name: "E-commerce", href: "#services" },
        { name: "APIs Personalizadas", href: "#services" },
        { name: "Consultoría Tech", href: "#services" },
        { name: "Mantenimiento", href: "#services" },
      ],
    },
    {
      title: "Tecnologías",
      links: [
        { name: "React & Next.js", href: "#skills" },
        { name: "Node.js & Express", href: "#skills" },
        { name: "TypeScript", href: "#skills" },
        { name: "MongoDB & MySQL", href: "#skills" },
        { name: "Flutter", href: "#skills" },
        { name: "Ver todas", href: "#skills" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/QuaDDom",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/mateo-quadrelli",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/jadom_dev",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/jadom.dev",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.198 14.895 3.29 13.31 3.29 11.987c0-1.297.49-2.448 1.297-3.328.881-.881 2.031-1.297 3.328-1.297s2.448.49 3.328 1.297c.881.881 1.297 2.031 1.297 3.328 0 1.297-.49 2.448-1.297 3.328-.881.881-2.031 1.297-3.328 1.297z" />
        </svg>
      ),
      color: "hover:text-pink-500",
    },
  ];

  const contactInfo = [
    {
      icon: HiMail,
      text: "matquadev@gmail.com",
      href: "mailto:matquadev@gmail.com",
    },
    {
      icon: HiPhone,
      text: "+54 9 3571 357410",
      href: "tel:+5493571357410",
    },
    {
      icon: HiLocationMarker,
      text: "Córdoba, Argentina",
      href: "#",
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-blue-50/60 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/60 dark:to-purple-900/30 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Seamless transition overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/40 via-transparent to-transparent dark:from-gray-800/40 dark:via-transparent dark:to-transparent" />

      {/* Background Elements - mobile optimized */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-r from-blue-600/8 to-purple-600/8 dark:from-blue-600/15 dark:to-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-56 lg:w-80 h-40 sm:h-56 lg:h-80 bg-gradient-to-r from-cyan-600/8 to-indigo-600/8 dark:from-cyan-600/15 dark:to-indigo-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content - mobile optimized */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand Section - mobile optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Mateo Quadrelli
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
                  Desarrollador Full Stack especializado en crear experiencias
                  digitales excepcionales que transforman ideas en realidades
                  tecnológicas impactantes.
                </p>
              </div>

              {/* Contact Info - mobile optimized */}
              <div className="space-y-2 sm:space-y-3">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-2 sm:space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group"
                    >
                      <div className="p-1.5 sm:p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg group-hover:bg-blue-600/20 transition-colors duration-300">
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-xs sm:text-sm">{item.text}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Links - mobile optimized */}
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-2.5 sm:p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-300/50 dark:hover:bg-gray-700/50`}
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Sections - mobile optimized */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
                className="space-y-3 sm:space-y-4"
              >
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    >
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-xs sm:text-sm flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                        <HiExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-300/50 dark:border-gray-700/50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 sm:space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Listo para tu próximo proyecto?
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Conversemos sobre cómo puedo ayudarte a alcanzar tus objetivos
                  digitales.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#contact")}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                Comencemos a Trabajar
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar - mobile optimized */}
        <div className="border-t border-gray-300/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 sm:space-y-4 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex items-center text-center md:text-left"
              >
                © {currentYear} Mateo Quadrelli. Diseñado y desarrollado con
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    color: ["#ef4444", "#f97316", "#ef4444"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-1"
                >
                  <HiHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.span>
                en Córdoba, Argentina.
              </motion.p>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-300/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                  aria-label="Volver arriba"
                >
                  <HiArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <div className="hidden sm:flex space-x-3 sm:space-x-4 text-xs text-gray-500 dark:text-gray-500">
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                    Política de Privacidad
                  </button>
                  <span>•</span>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                    Términos de Servicio
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile-only legal links */}
            <div className="flex sm:hidden justify-center space-x-4 mt-3 text-xs text-gray-500 dark:text-gray-500">
              <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                Política de Privacidad
              </button>
              <span>•</span>
              <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
                Términos de Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
