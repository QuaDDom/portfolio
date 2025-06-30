"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title?: string;
  description?: string;
  price?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  price,
  children,
  onClick,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="p-6 relative">
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {title && (
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {description}
            </p>
          )}
          {price && (
            <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {price}
            </p>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
