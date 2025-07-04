"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  HiCode,
  HiLightBulb,
  HiColorSwatch,
  HiTrendingUp,
  HiLightningBolt,
  HiDesktopComputer,
  HiUsers,
  HiChartBar,
  HiArrowRight,
} from "react-icons/hi";

const About: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    }
  };

  const stats = [
    {
      number: "50+",
      labelKey: "about.stats.projects",
      icon: HiDesktopComputer,
      color: "from-blue-500 to-blue-700",
    },
    {
      number: "3+",
      labelKey: "about.stats.experience",
      icon: HiTrendingUp,
      color: "from-green-500 to-green-700",
    },
    {
      number: "100%",
      labelKey: "about.stats.clients",
      icon: HiUsers,
      color: "from-purple-500 to-purple-700",
    },
    {
      number: "24/7",
      labelKey: "about.stats.support",
      icon: HiLightningBolt,
      color: "from-orange-500 to-orange-700",
    },
  ];

  const highlights = [
    {
      icon: HiCode,
      titleKey: "about.highlight1.title",
      descriptionKey: "about.highlight1.desc",
      color: "from-blue-600 to-cyan-600",
      bgColor:
        "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    },
    {
      icon: HiLightBulb,
      titleKey: "about.highlight2.title",
      descriptionKey: "about.highlight2.desc",
      color: "from-purple-600 to-pink-600",
      bgColor:
        "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    },
    {
      icon: HiColorSwatch,
      titleKey: "about.highlight3.title",
      descriptionKey: "about.highlight3.desc",
      color: "from-green-600 to-emerald-600",
      bgColor:
        "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    },
    {
      icon: HiChartBar,
      titleKey: "about.highlight4.title",
      descriptionKey: "about.highlight4.desc",
      color: "from-orange-600 to-red-600",
      bgColor:
        "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    },
  ];

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background system - consistent with Services/Contact */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/10" />

      {/* Background decoration - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div
          className="absolute top-10 sm:top-20 lg:top-1/4 right-10 sm:right-20 lg:right-1/4 w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 lg:bottom-1/4 left-10 sm:left-20 lg:left-1/4 w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section - mobile optimized */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-200 text-xs sm:text-sm font-medium shadow-md mb-6 sm:mb-8"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1.5 sm:mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t("about.badge")}
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Main Content - mobile optimized */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-12 sm:mb-16 lg:mb-20 relative overflow-hidden"
          >
            {/* Background decoration with mouse interaction - mobile optimized */}
            <motion.div
              className="absolute top-0 right-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * 0.1,
                y: mousePosition.y * 0.1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 rounded-full blur-3xl"
              animate={{
                x: mousePosition.x * -0.1,
                y: mousePosition.y * -0.1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
              <div className="space-y-4 sm:space-y-6">
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {t("about.main.title")}
                </motion.h3>

                <div className="space-y-3 sm:space-y-4">
                  <motion.p
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {t("about.main.description1")}
                  </motion.p>

                  <motion.p
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {t("about.main.description2")}
                  </motion.p>
                </div>
              </div>

              {/* Stats Grid - mobile optimized */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 text-center group cursor-pointer relative overflow-hidden"
                    >
                      {/* Enhanced hover background effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />

                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                          className={`inline-flex p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} shadow-lg mb-2 sm:mb-3`}
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </motion.div>
                        <motion.div
                          className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.number}
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight">
                          {t(stat.labelKey)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid - mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} shadow-lg mb-3 sm:mb-4`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <motion.h4
                      className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {t(item.titleKey)}
                    </motion.h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {t(item.descriptionKey)}
                    </p>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section - mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white overflow-hidden"
          >
            {/* Background decoration - mobile optimized */}
            <div className="absolute top-0 left-0 w-20 sm:w-28 lg:w-32 h-20 sm:h-28 lg:h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm" />

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4"
              >
                {t("about.cta.title")}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-2"
              >
                {t("about.cta.description")}
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
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-sm sm:text-base"
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent -translate-x-full"
                  whileHover={{
                    x: "200%",
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{t("about.cta.button")}</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
