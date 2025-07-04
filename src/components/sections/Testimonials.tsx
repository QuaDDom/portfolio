"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { HiStar, HiChat } from "react-icons/hi";

const testimonials = [
  {
    id: 1,
    name: "Ana García",
    position: "CEO, TechStartup",
    company: "TechStartup Inc.",
    text: "Mateo transformó completamente nuestra presencia digital. El resultado superó todas nuestras expectativas y el ROI fue evidente desde el primer mes.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop&crop=face",
    project: "E-commerce Platform",
    results: "+150% conversiones",
  },
  {
    id: 2,
    name: "Carlos Rivera",
    position: "Director de Marketing",
    company: "Digital Solutions",
    text: "Profesionalismo excepcional, entrega puntual y calidad inigualable. Definitivamente nuestro desarrollador de confianza para futuros proyectos.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    project: "Corporate Website",
    results: "+200% tráfico web",
  },
  {
    id: 3,
    name: "María González",
    position: "Founder",
    company: "Creative Agency",
    text: "La atención al detalle y la capacidad de entender nuestras necesidades específicas hicieron que el proyecto fuera un éxito rotundo.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    project: "Portfolio Website",
    results: "+90% leads calificados",
  },
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lo Que Dicen Mis Clientes
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Testimonios reales de clientes satisfechos que han visto resultados
            excepcionales
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 relative"
            >
              {/* Quote Icon */}
              <HiChat className="w-8 h-8 text-blue-500 mb-4" />

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Project Results */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.project}
                  </span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">
                    {testimonial.results}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
