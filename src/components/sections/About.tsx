"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
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
  const controls = useAnimation();

  // Simplified mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 400 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 400 });

  // Memoized data arrays
  const stats = React.useMemo(
    () => [
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
    ],
    []
  );

  const highlights = React.useMemo(
    () => [
      {
        icon: HiCode,
        titleKey: "about.highlight1.title",
        descriptionKey: "about.highlight1.desc",
        color: "from-blue-600 to-cyan-600",
      },
      {
        icon: HiLightBulb,
        titleKey: "about.highlight2.title",
        descriptionKey: "about.highlight2.desc",
        color: "from-purple-600 to-pink-600",
      },
      {
        icon: HiColorSwatch,
        titleKey: "about.highlight3.title",
        descriptionKey: "about.highlight3.desc",
        color: "from-green-600 to-emerald-600",
      },
      {
        icon: HiChartBar,
        titleKey: "about.highlight4.title",
        descriptionKey: "about.highlight4.desc",
        color: "from-orange-600 to-red-600",
      },
    ],
    []
  );

  // Optimized mouse tracking
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        mouseX.set(x);
        mouseY.set(y);
      }
    },
    [mouseX, mouseY]
  );

  // Simplified animation variants
  const containerVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = React.useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    }),
    []
  );

  const scrollToContact = React.useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/10" />

      {/* Optimized background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 rounded-full blur-3xl"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium shadow-md mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t("about.badge")}
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-16 relative"
          >
            {/* Simple background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400/5 to-indigo-400/5 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t("about.main.title")}
                </h3>

                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {t("about.main.description1")}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {t("about.main.description2")}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 text-center group cursor-pointer"
                    >
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg mb-3`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t(stat.labelKey)}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg mb-4`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(item.descriptionKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t("about.cta.title")}
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                {t("about.cta.description")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>{t("about.cta.button")}</span>
                <HiArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
