"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import emailjs from "@emailjs/browser";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiCheckCircle,
  HiExclamationCircle,
  HiRefresh,
  HiStar,
  HiTag,
} from "react-icons/hi";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

// Add EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.EMAILJS_SERVICE_ID || "",
  templateId: process.env.EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
  serviceType?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captcha?: string;
}

interface Captcha {
  question: string;
  answer: number;
}

interface ServiceData {
  id: string;
  title: string;
  price: string;
  addOns: string[];
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
    serviceType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState<Captcha>({ question: "", answer: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServiceData, setSelectedServiceData] =
    useState<ServiceData | null>(null);
  const [submitError, setSubmitError] = useState<string>("");

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    if (EMAILJS_CONFIG.publicKey) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }
  }, []);

  const contactInfo = [
    {
      icon: HiMail,
      labelKey: "contact.labels.email",
      value: "matquadev@gmail.com",
      href: "mailto:matquadev@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: HiPhone,
      labelKey: "contact.labels.phone",
      value: "+54 9 3571 357410",
      href: "tel:+5493571357410",
      color: "from-green-500 to-green-600",
    },
    {
      icon: HiLocationMarker,
      labelKey: "contact.labels.location",
      value: "Córdoba, Argentina",
      href: "#",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: HiClock,
      labelKey: "contact.labels.schedule",
      valueKey: "contact.values.schedule",
      href: "#",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const budgetRanges = [
    "< $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
  ];

  const timelineOptions = [
    "Lo antes posible",
    "En 2-4 semanas",
    "En 1-2 meses",
    "En 3-6 meses",
    "Flexible",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: SiGithub,
      href: "https://github.com/QuaDDom",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      href: "https://linkedin.com/in/mateo-quadrelli",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: SiX,
      href: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      href: "https://instagram.com",
      color: "hover:text-pink-500",
    },
  ];

  // Generate math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    let question: string;

    switch (operator) {
      case "+":
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case "-":
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller}`;
        break;
      case "*":
        const smallNum1 = Math.floor(Math.random() * 5) + 1;
        const smallNum2 = Math.floor(Math.random() * 5) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2}`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
    }

    setCaptcha({ question, answer });
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const handleServiceSelection = (event: CustomEvent) => {
      const serviceData = event.detail as ServiceData;
      setSelectedServiceData(serviceData);

      // Auto-populate form
      setFormData((prev) => ({
        ...prev,
        subject: `Consulta sobre ${serviceData.title}`,
        message: generateServiceMessage(serviceData),
        serviceType: serviceData.id,
        budget: extractBudgetFromPrice(serviceData.price),
      }));
    };

    window.addEventListener(
      "serviceSelected",
      handleServiceSelection as EventListener
    );

    // Check for stored service data
    const storedService = localStorage.getItem("selectedService");
    if (storedService) {
      try {
        const serviceData = JSON.parse(storedService) as ServiceData;
        handleServiceSelection({ detail: serviceData } as CustomEvent);
        localStorage.removeItem("selectedService");
      } catch (error) {
        console.error("Error parsing stored service data:", error);
      }
    }

    return () => {
      window.removeEventListener(
        "serviceSelected",
        handleServiceSelection as EventListener
      );
    };
  }, []);

  const generateServiceMessage = (serviceData: ServiceData) => {
    let message = `Hola! Estoy interesado en el servicio "${serviceData.title}"`;

    if (serviceData.addOns.length > 0) {
      message += `\n\nServicios adicionales seleccionados:\n${serviceData.addOns
        .map((addon) => `• ${addon}`)
        .join("\n")}`;
    }

    message += `\n\nMe gustaría obtener más información sobre:\n• Cronograma detallado del proyecto\n• Proceso de desarrollo\n• Métodos de pago disponibles\n• Próximos pasos para comenzar\n\n¡Espero tu respuesta!`;

    return message;
  };

  const extractBudgetFromPrice = (price: string): string => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));

    if (numericPrice < 1000) return "< $1,000";
    if (numericPrice < 5000) return "$1,000 - $5,000";
    if (numericPrice < 10000) return "$5,000 - $10,000";
    if (numericPrice < 25000) return "$10,000 - $25,000";
    return "$25,000+";
  };

  const clearServiceSelection = () => {
    setSelectedServiceData(null);
    setFormData((prev) => ({
      ...prev,
      subject: "",
      message: "",
      serviceType: "",
      budget: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.subject.trim()) newErrors.subject = "El asunto es requerido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    if (!captchaInput.trim()) {
      newErrors.captcha = "Por favor, resuelve la operación matemática";
    } else if (parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = "Respuesta incorrecta";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Check if EmailJS is properly configured
      if (
        !EMAILJS_CONFIG.serviceId ||
        !EMAILJS_CONFIG.templateId ||
        !EMAILJS_CONFIG.publicKey
      ) {
        // Fallback to mailto
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
          `Nombre: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Presupuesto: ${formData.budget}\n` +
            `Tiempo: ${formData.timeline}\n` +
            `Servicio: ${
              selectedServiceData?.title || "Consulta general"
            }\n\n` +
            `Mensaje:\n${formData.message}`
        );

        window.location.href = `mailto:matquadev@gmail.com?subject=${subject}&body=${body}`;
        setShowSuccess(true);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          budget: "",
          timeline: "",
          serviceType: "",
        });
        setSelectedServiceData(null);
        setCaptchaInput("");
        generateCaptcha();
        return;
      }

      // Prepare email data for EmailJS
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        budget: formData.budget || "No especificado",
        timeline: formData.timeline || "No especificado",
        service_type: selectedServiceData?.title || "Consulta general",
        service_price: selectedServiceData?.price || "N/A",
        service_addons: selectedServiceData?.addOns.join(", ") || "Ninguno",
        timestamp: new Date().toLocaleString("es-AR"),
      };

      // Send email via EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        emailData
      );

      console.log("Email sent successfully:", result);

      setShowSuccess(true);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        budget: "",
        timeline: "",
        serviceType: "",
      });
      setSelectedServiceData(null);
      setCaptchaInput("");
      generateCaptcha();

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente a matquadev@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t("contact.info.title")}
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.a
                        key={index}
                        href={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {t(item.labelKey)}
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {item.value || t(item.valueKey || "")}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                  {t("contact.social.title")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl text-gray-600 dark:text-gray-400 ${social.color} hover:shadow-lg transition-all duration-300 group`}
                      >
                        <IconComponent className="w-6 h-6 mr-2" />
                        <span className="font-medium">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Service Selection Banner */}
              <AnimatePresence>
                {selectedServiceData && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                          <HiStar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Servicio seleccionado: {selectedServiceData.title}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <HiTag className="w-4 h-4 mr-1" />
                              {selectedServiceData.price}
                            </span>
                            {selectedServiceData.addOns.length > 0 && (
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                +{selectedServiceData.addOns.length}{" "}
                                complementos
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clearServiceSelection}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        <HiRefresh className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {selectedServiceData.addOns.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-blue-500/20"
                      >
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Servicios adicionales incluidos:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedServiceData.addOns.map((addon, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                            >
                              {addon}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      placeholder={t("contact.form.placeholder.name")}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <HiExclamationCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.email
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      placeholder={t("contact.form.placeholder.email")}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center"
                      >
                        <HiExclamationCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.budget")}
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:border-gray-400"
                    >
                      <option value="">Selecciona un rango</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.timeline")}
                    </label>
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:border-gray-400"
                    >
                      <option value="">Selecciona un tiempo</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.subject")} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.subject
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder={t("contact.form.placeholder.subject")}
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <HiExclamationCircle className="w-4 h-4 mr-1" />
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none ${
                      errors.message
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder={t("contact.form.placeholder.message")}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <HiExclamationCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Captcha */}
                <div>
                  <label
                    htmlFor="captcha"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.form.captcha")} *
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
                      <span className="text-lg font-mono text-gray-900 dark:text-white">
                        {captcha.question} = ?
                      </span>
                      <motion.button
                        type="button"
                        onClick={generateCaptcha}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <HiRefresh className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        if (errors.captcha) {
                          setErrors({ ...errors, captcha: undefined });
                        }
                      }}
                      className={`w-24 px-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center ${
                        errors.captcha
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      placeholder={t("contact.form.placeholder.captcha")}
                    />
                  </div>
                  {errors.captcha && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <HiExclamationCircle className="w-4 h-4 mr-1" />
                      {errors.captcha}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                    selectedServiceData
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>{t("contact.form.sending")}</span>
                    </>
                  ) : (
                    <>
                      <HiMail className="w-5 h-5" />
                      <span>
                        {selectedServiceData
                          ? `Solicitar ${selectedServiceData.title}`
                          : t("contact.form.submit")}
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <div className="flex items-center space-x-2 text-red-800 dark:text-red-200">
                      <HiExclamationCircle className="w-5 h-5" />
                      <span className="text-sm">{submitError}</span>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 max-w-sm">
                <HiCheckCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <div className="font-semibold">¡Mensaje enviado!</div>
                  <div className="text-sm opacity-90">
                    Te responderé pronto a tu email
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
