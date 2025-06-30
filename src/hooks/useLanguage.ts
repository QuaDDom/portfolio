"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const [language, setLanguage] = useState("es"); // Default language
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return { language, toggleLanguage };
};

export default useLanguage;
