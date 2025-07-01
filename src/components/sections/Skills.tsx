"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiFlutter,
  SiExpress,
  SiMysql,
  SiJavascript,
} from "react-icons/si";

const skillsData = [
  {
    name: "React",
    descriptionKey: "skills.react.desc",
    icon: SiReact,
    color: "from-blue-400 to-cyan-400",
    category: "Frontend",
    docsUrl: "https://react.dev/",
  },
  {
    name: "Next.js",
    descriptionKey: "skills.nextjs.desc",
    icon: SiNextdotjs,
    color: "from-gray-700 to-gray-900",
    category: "Frontend",
    docsUrl: "https://nextjs.org/docs",
  },
  {
    name: "TypeScript",
    descriptionKey: "skills.typescript.desc",
    icon: SiTypescript,
    color: "from-blue-500 to-blue-700",
    category: "Lenguaje",
    docsUrl: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "Node.js",
    descriptionKey: "skills.nodejs.desc",
    icon: SiNodedotjs,
    color: "from-green-400 to-green-600",
    category: "Backend",
    docsUrl: "https://nodejs.org/en/docs/",
  },
  {
    name: "MongoDB",
    descriptionKey: "skills.mongodb.desc",
    icon: SiMongodb,
    color: "from-green-500 to-green-700",
    category: "Base de Datos",
    docsUrl: "https://www.mongodb.com/docs/",
  },
  {
    name: "Flutter",
    descriptionKey: "skills.flutter.desc",
    icon: SiFlutter,
    color: "from-blue-300 to-blue-500",
    category: "Mobile",
    docsUrl: "https://docs.flutter.dev/",
  },
  {
    name: "Express.js",
    descriptionKey: "skills.express.desc",
    icon: SiExpress,
    color: "from-gray-600 to-gray-800",
    category: "Backend",
    docsUrl: "https://expressjs.com/",
  },
  {
    name: "MySQL",
    descriptionKey: "skills.mysql.desc",
    icon: SiMysql,
    color: "from-orange-400 to-orange-600",
    category: "Base de Datos",
    docsUrl: "https://dev.mysql.com/doc/",
  },
  {
    name: "JavaScript",
    descriptionKey: "skills.javascript.desc",
    icon: SiJavascript,
    color: "from-yellow-400 to-yellow-500",
    category: "Lenguaje",
    docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
];

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  // Translate categories
  const categories = [
    t("skills.category.all"),
    t("skills.category.frontend"),
    t("skills.category.backend"),
    t("skills.category.database"),
    "Mobile",
    t("skills.category.language"),
  ];

  // Map translated categories to original categories for filtering
  const categoryMap: Record<string, string> = {
    [t("skills.category.all")]: "Todos",
    [t("skills.category.frontend")]: "Frontend",
    [t("skills.category.backend")]: "Backend",
    [t("skills.category.database")]: "Base de Datos",
    Mobile: "Mobile",
    [t("skills.category.language")]: "Lenguaje",
  };

  const filteredSkills =
    selectedCategory === "Todos" ||
    selectedCategory === t("skills.category.all")
      ? skillsData
      : skillsData.filter(
          (skill) => skill.category === categoryMap[selectedCategory]
        );

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background system - consistent with other sections */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-transparent to-gray-100/10 dark:from-gray-900/20 dark:via-transparent dark:to-gray-800/10" />

      {/* Subtle background elements - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-10 sm:top-20 lg:top-1/3 left-10 sm:left-20 lg:left-1/3 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 sm:bottom-20 lg:bottom-1/3 right-10 sm:right-20 lg:right-1/3 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-gradient-to-r from-cyan-500/3 to-indigo-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        {/* Header - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {t("skills.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Category Filter - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ease-out ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - mobile optimized */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={`${skill.name}-${selectedCategory}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className={`
                    group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                    rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 
                    overflow-hidden cursor-pointer transform-gpu
                    hover:-translate-y-2 hover:scale-105 
                    transition-transform duration-300 ease-out
                  `}
                >
                  {/* Background gradient on hover */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl sm:rounded-2xl 
                      opacity-0 group-hover:opacity-5 transition-opacity duration-300
                    `}
                  />

                  <div className="relative z-10">
                    {/* Header - mobile optimized */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div
                          className={`
                            p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${skill.color} shadow-lg
                            group-hover:scale-110 group-hover:rotate-6 
                            transition-transform duration-300 ease-out
                          `}
                        >
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                          <h3
                            className={`
                              text-lg sm:text-xl font-bold text-gray-900 dark:text-white 
                              group-hover:text-blue-600 dark:group-hover:text-blue-400
                              transition-colors duration-300
                            `}
                          >
                            {skill.name}
                          </h3>
                          <span
                            className={`
                              text-xs font-medium text-gray-500 dark:text-gray-400 
                              bg-gray-100 dark:bg-gray-700 px-2 py-0.5 sm:py-1 rounded-full
                              group-hover:scale-105 transition-transform duration-300
                            `}
                          >
                            {skill.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description - mobile optimized */}
                    <p
                      className={`
                        text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4
                        group-hover:opacity-90 transition-opacity duration-300
                      `}
                    >
                      {t(skill.descriptionKey)}
                    </p>

                    {/* Hover indicator - mobile optimized */}
                    <a
                      href={skill.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium
                        opacity-0 group-hover:opacity-100 
                        transform translate-y-2 group-hover:translate-y-0
                        transition-all duration-300 ease-out
                        hover:text-blue-700 dark:hover:text-blue-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-1
                      `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        className={`
                          group-hover:translate-x-1 transition-transform duration-300
                        `}
                      >
                        Ver documentación
                      </span>
                      <svg
                        className={`
                          w-3 h-3 ml-1 group-hover:translate-x-2
                          transition-transform duration-300
                        `}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Shine effect */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      -translate-x-full group-hover:translate-x-full
                      transition-transform duration-700 ease-in-out
                    `}
                  />

                  {/* Progress bar at bottom */}
                  <div
                    className={`
                      absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 
                      rounded-b-xl sm:rounded-b-2xl w-0 group-hover:w-full
                      transition-all duration-500 ease-out
                    `}
                  />

                  {/* Enhanced shadow */}
                  <div
                    className={`
                      absolute inset-0 rounded-xl sm:rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 pointer-events-none
                    `}
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
            {/* Background decoration - mobile optimized */}
            <div className="absolute top-0 left-0 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
              >
                {t("skills.cta.title")}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed px-2"
              >
                {t("skills.cta.description")}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden text-sm sm:text-base"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{t("skills.cta.button")}</span>
                  <motion.svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    animate={{ x: [0, 2, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
