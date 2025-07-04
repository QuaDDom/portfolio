"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { HiExternalLink, HiCode, HiEye, HiStar } from "react-icons/hi";

interface Project {
  id: string | number;
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey?: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
  category: string;
  featured?: boolean;
  status?: "completed" | "in-progress" | "planned";
  year?: string;
  duration?: string;
  client?: string;
  results?: {
    performance?: string;
    conversion?: string;
    traffic?: string;
  };
  testimonial?: {
    text: string;
    author: string;
    rating: number;
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    titleKey: "projects.ecommerce.title",
    descriptionKey: "projects.ecommerce.description",
    longDescriptionKey: "projects.ecommerce.longDescription",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "MongoDB",
      "Tailwind CSS",
    ],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
    featured: true,
    status: "completed",
    year: "2024",
    duration: "6 semanas",
    client: "StartupTech Inc.",
    results: {
      performance: "+40% velocidad",
      conversion: "+25% conversiones",
      traffic: "+60% tráfico orgánico",
    },
    testimonial: {
      text: "Mateo transformó completamente nuestra presencia digital. Increíble trabajo.",
      author: "Ana García, CEO StartupTech",
      rating: 5,
    },
  },
  {
    id: 2,
    titleKey: "projects.taskmanagement.title",
    descriptionKey: "projects.taskmanagement.description",
    longDescriptionKey: "projects.taskmanagement.longDescription",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "mobile",
    featured: true,
    status: "completed",
    year: "2025",
  },
  {
    id: 3,
    titleKey: "projects.analytics.title",
    descriptionKey: "projects.analytics.description",
    longDescriptionKey: "projects.analytics.longDescription",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Docker"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: 4,
    titleKey: "projects.restaurant.title",
    descriptionKey: "projects.restaurant.description",
    longDescriptionKey: "projects.restaurant.longDescription",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "Express.js", "MySQL", "Socket.io"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: 5,
    titleKey: "projects.fitness.title",
    descriptionKey: "projects.fitness.description",
    longDescriptionKey: "projects.fitness.longDescription",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "api",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: 6,
    titleKey: "projects.realestate.title",
    descriptionKey: "projects.realestate.description",
    longDescriptionKey: "projects.realestate.longDescription",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Mapbox", "Three.js", "Prisma", "PostgreSQL"],
    liveLink: "https://example.com",
    githubLink: "https://github.com",
    category: "web",
    featured: true,
    status: "in-progress",
    year: "2025",
  },
];

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", name: t("projects.category.all"), count: projectsData.length },
    {
      id: "web",
      name: t("projects.category.web"),
      count: projectsData.filter((p) => p.category === "web").length,
    },
    {
      id: "mobile",
      name: t("projects.category.mobile"),
      count: projectsData.filter((p) => p.category === "mobile").length,
    },
    {
      id: "api",
      name: t("projects.category.api"),
      count: projectsData.filter((p) => p.category === "api").length,
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);
  const featuredProjects = projectsData.filter((project) => project.featured);

  const getStatusText = (status?: string) => {
    switch (status) {
      case "completed":
        return t("projects.status.completed");
      case "in-progress":
        return t("projects.status.inprogress");
      case "planned":
        return t("projects.status.planned");
      default:
        return t("projects.status.completed");
    }
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background system - consistent with other sections */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/15 dark:from-blue-950/15 dark:via-transparent dark:to-purple-950/10" />

      {/* Background elements - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute top-10 sm:top-20 lg:top-1/4 left-10 sm:left-20 lg:left-1/6 w-32 sm:w-56 lg:w-72 h-32 sm:h-56 lg:h-72 bg-gradient-to-r from-purple-500/4 to-pink-500/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 sm:bottom-20 lg:bottom-1/4 right-10 sm:right-20 lg:right-1/6 w-28 sm:w-42 lg:w-56 h-28 sm:h-42 lg:h-56 bg-gradient-to-r from-green-500/4 to-emerald-500/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
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
            {t("projects.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Featured Projects - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <HiStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
              {t("projects.featured")}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-500"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "completed"
                          ? "bg-green-500/90 text-white border border-green-400/30"
                          : project.status === "in-progress"
                          ? "bg-blue-500/90 text-white border border-blue-400/30"
                          : "bg-gray-500/90 text-white border border-gray-400/30"
                      }`}
                    >
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium border border-white/30"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium border border-white/30">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {t(project.titleKey)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                        {t(project.descriptionKey)}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full ml-3 sm:ml-4">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 sm:space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          window.open(project.liveLink, "_blank");
                        }}
                        className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                      >
                        <HiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{t("projects.button.view")}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          window.open(project.githubLink, "_blank");
                        }}
                        className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-xs sm:text-sm"
                      >
                        <HiCode className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{t("projects.button.code")}</span>
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <div>
          {/* Filter Controls - mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                    filter === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                      filter === category.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setViewMode("grid")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-300 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-300 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Projects Grid/List - mobile optimized */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                  : "space-y-4 sm:space-y-6"
              }
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group cursor-pointer transition-all duration-500 ${
                    viewMode === "grid"
                      ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl"
                      : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center space-x-4 sm:space-x-6 hover:shadow-xl"
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={t(project.titleKey)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {t(project.titleKey)}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                          {t(project.descriptionKey)}
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.img
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {t(project.titleKey)}
                          </h4>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {project.year}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2 text-xs sm:text-sm">
                          {t(project.descriptionKey)}
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies
                            .slice(0, 4)
                            .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal - mobile optimized */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
                onClick={(e: any) => e.stopPropagation()}
              >
                <div className="relative">
                  <motion.img
                    src={selectedProject.image}
                    alt={t(selectedProject.titleKey)}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-2xl sm:rounded-t-3xl"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-2xl sm:rounded-t-3xl" />

                  <motion.button
                    onClick={closeModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300 backdrop-blur-sm"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6 sm:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start justify-between mb-4 sm:mb-6"
                  >
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t(selectedProject.titleKey)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
                        {selectedProject.longDescriptionKey
                          ? t(selectedProject.longDescriptionKey)
                          : t(selectedProject.descriptionKey)}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full ml-4">
                      {selectedProject.year}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 sm:mb-8"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      {t("projects.modal.technologies")}
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-lg sm:rounded-xl font-medium border border-blue-200/50 dark:border-blue-700/50 text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Métricas de resultados */}
                  {selectedProject.results && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6 sm:mb-8"
                    >
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                        Resultados Alcanzados
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(selectedProject.results).map(
                          ([key, value], index) => (
                            <div
                              key={key}
                              className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
                            >
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                {value}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                {key}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Testimonial */}
                  {selectedProject.testimonial && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6 sm:mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500"
                    >
                      <div className="flex items-center mb-2">
                        {[...Array(selectedProject.testimonial.rating)].map(
                          (_, i) => (
                            <HiStar
                              key={i}
                              className="w-4 h-4 text-yellow-500"
                            />
                          )
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                        "{selectedProject.testimonial.text}"
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                        — {selectedProject.testimonial.author}
                      </p>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        window.open(selectedProject.liveLink, "_blank")
                      }
                      className="flex-1 flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    >
                      <HiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t("projects.button.view")}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        window.open(selectedProject.githubLink, "_blank")
                      }
                      className="flex-1 flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm sm:text-base"
                    >
                      <HiCode className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t("projects.button.code")}</span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
