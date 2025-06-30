"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, languages } from "../../contexts/LanguageContext";
import { HiGlobeAlt, HiChevronDown } from "react-icons/hi";

interface LanguageSelectorProps {
  className?: string;
  variant?: "dropdown" | "compact";
  showFlag?: boolean;
  showName?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = "",
  variant = "dropdown",
  showFlag = true,
  showName = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();

  if (variant === "compact") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <HiGlobeAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <div className="flex space-x-1">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setLanguage(lang)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors duration-200 ${
                currentLanguage.code === lang.code
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {showFlag && <span className="mr-1">{lang.flag}</span>}
              {lang.code.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-2 px-4 py-3 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 rounded-xl text-sm font-medium transition-all duration-200"
      >
        <HiGlobeAlt className="w-4 h-4" />
        {showFlag && <span>{currentLanguage.flag}</span>}
        {showName && <span>{currentLanguage.code.toUpperCase()}</span>}
        <HiChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-44 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl py-2 z-20"
            >
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-150 flex items-center space-x-3 ${
                    currentLanguage.code === lang.code
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  {currentLanguage.code === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
