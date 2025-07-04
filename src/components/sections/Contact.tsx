"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import ReCAPTCHA from "react-google-recaptcha";
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
  HiPlus,
  HiCalculator,
  HiShieldCheck,
} from "react-icons/hi";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

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

interface ServiceData {
  id: string;
  title: string;
  basePrice: string;
  totalPrice: string;
  addOns: Array<{
    id: string;
    name: string;
    price: string;
    description: string;
  }>;
  duration: string;
  category: string;
}

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServiceData, setSelectedServiceData] =
    useState<ServiceData | null>(null);
  const [submitError, setSubmitError] = useState<string>("");

  const contactInfo = [
    {
      icon: HiMail,
      labelKey: "contact.labels.email",
      value: "mateo@mateoquadrelli.com",
      href: "mailto:mateo@mateoquadrelli.com",
      color: "from-blue-500 to-blue-600",
      subtitle: "Respuesta en menos de 2 horas",
    },
    {
      icon: HiPhone,
      labelKey: "contact.labels.phone",
      value: "+54 9 3571 357410",
      href: "tel:+5493571357410",
      color: "from-green-500 to-green-600",
      subtitle: "WhatsApp disponible 24/7",
    },
    {
      icon: HiLocationMarker,
      labelKey: "contact.labels.location",
      value: "Córdoba, Argentina (UTC-3)",
      href: "#",
      color: "from-purple-500 to-purple-600",
      subtitle: "Trabajando globalmente",
    },
    {
      icon: HiClock,
      labelKey: "contact.labels.schedule",
      valueKey: "contact.values.schedule",
      value: "Lun-Vie 9:00-18:00",
      href: "#",
      color: "from-orange-500 to-orange-600",
      subtitle: "Urgencias atendidas 24/7",
    },
  ];

  const workProcess = [
    {
      step: "1",
      title: "Consulta Inicial Gratuita",
      description: "Conversamos sobre tu proyecto y necesidades específicas",
      duration: "30 min",
    },
    {
      step: "2",
      title: "Propuesta Personalizada",
      description: "Recibe una cotización detallada en menos de 24 horas",
      duration: "1 día",
    },
    {
      step: "3",
      title: "Desarrollo Ágil",
      description: "Desarrollo con actualizaciones diarias de progreso",
      duration: "1-8 semanas",
    },
    {
      step: "4",
      title: "Lanzamiento & Soporte",
      description: "Entrega final con soporte continuo incluido",
      duration: "Ongoing",
    },
  ];

  const testimonials = [
    {
      text: "Mateo superó todas nuestras expectativas. Profesional excepcional.",
      author: "Carlos Rivera",
      company: "TechCorp",
      rating: 5,
    },
    {
      text: "Calidad increíble y entrega siempre a tiempo. Altamente recomendado.",
      author: "María González",
      company: "Startup Digital",
      rating: 5,
    },
  ];

  const budgetRanges = [
    "Menos de $500",
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "Más de $25,000",
    "Presupuesto personalizado",
  ];

  const timelineOptions = [
    "Lo antes posible (Express +50%)",
    "En 1-2 semanas",
    "En 2-4 semanas",
    "En 1-2 meses",
    "En 3-6 meses",
    "Tengo flexibilidad de tiempo",
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

  const generateEnhancedServiceMessage = (serviceData: ServiceData) => {
    let message = `¡Hola! Estoy interesado en solicitar una cotización para el servicio "${serviceData.title}".

📋 DETALLES DEL SERVICIO:
• Servicio base: ${serviceData.title}
• Precio base: ${serviceData.basePrice}
• Tiempo estimado: ${serviceData.duration}`;

    if (
      serviceData.addOns &&
      Array.isArray(serviceData.addOns) &&
      serviceData.addOns.length > 0
    ) {
      const validAddOns = serviceData.addOns.filter(
        (addon) =>
          addon &&
          typeof addon === "object" &&
          addon.name &&
          addon.price &&
          addon.description
      );

      if (validAddOns.length > 0) {
        message += `\n\n🎯 SERVICIOS ADICIONALES SELECCIONADOS:`;
        validAddOns.forEach((addon) => {
          message += `\n• ${addon.name} - ${addon.price}`;
          message += `\n  ${addon.description}`;
        });

        message += `\n\n💰 PRECIO TOTAL ESTIMADO: ${serviceData.totalPrice}`;
      }
    }

    message += `\n\n📞 ME GUSTARÍA OBTENER MÁS INFORMACIÓN SOBRE:
• Cronograma detallado del proyecto
• Proceso de desarrollo y metodología
• Métodos de pago y condiciones
• Garantías y soporte post-entrega
• Posibilidad de personalización adicional

¿Podrías confirmar la disponibilidad y enviarme una propuesta formal?

¡Espero tu respuesta pronto!`;

    return message;
  };

  const getBudgetFromPrice = (price: string): string => {
    if (!price || typeof price !== "string") return "Presupuesto personalizado";

    const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 0;

    if (numericPrice < 500) return "Menos de $500";
    if (numericPrice < 1000) return "$500 - $1,000";
    if (numericPrice < 2500) return "$1,000 - $2,500";
    if (numericPrice < 5000) return "$2,500 - $5,000";
    if (numericPrice < 10000) return "$5,000 - $10,000";
    if (numericPrice < 25000) return "$10,000 - $25,000";
    return "Más de $25,000";
  };

  const getTimelineFromDuration = (duration: string): string => {
    if (!duration || typeof duration !== "string")
      return "Tengo flexibilidad de tiempo";

    const lowerDuration = duration.toLowerCase();

    if (
      lowerDuration.includes("5-7 días") ||
      lowerDuration.includes("1 semana")
    ) {
      return "En 1-2 semanas";
    }
    if (lowerDuration.includes("2-3 semanas")) {
      return "En 2-4 semanas";
    }
    if (
      lowerDuration.includes("3-5 semanas") ||
      lowerDuration.includes("1 mes")
    ) {
      return "En 1-2 meses";
    }
    if (
      lowerDuration.includes("4-12 semanas") ||
      lowerDuration.includes("meses")
    ) {
      return "En 3-6 meses";
    }

    return "Tengo flexibilidad de tiempo";
  };

  useEffect(() => {
    const handleServiceSelection = (event: CustomEvent) => {
      try {
        const serviceData = event.detail as ServiceData;

        if (!serviceData || typeof serviceData !== "object") {
          console.error("Invalid service data received:", serviceData);
          return;
        }

        const validatedServiceData: ServiceData = {
          ...serviceData,
          addOns: Array.isArray(serviceData.addOns)
            ? serviceData.addOns.filter(
                (addon) =>
                  addon &&
                  typeof addon === "object" &&
                  addon.name &&
                  addon.price &&
                  addon.description
              )
            : [],
        };

        setSelectedServiceData(validatedServiceData);

        setFormData((prev) => ({
          ...prev,
          subject: `Solicitud de cotización: ${
            validatedServiceData.title || "Servicio"
          }`,
          message: generateEnhancedServiceMessage(validatedServiceData),
          serviceType: validatedServiceData.category || "",
          budget: getBudgetFromPrice(validatedServiceData.totalPrice || ""),
          timeline:
            validatedServiceData.duration &&
            (validatedServiceData.duration.includes("express") ||
              validatedServiceData.duration.includes("rápido"))
              ? "Lo antes posible (Express +50%)"
              : getTimelineFromDuration(validatedServiceData.duration || ""),
        }));
      } catch (error) {
        console.error("Error handling service selection:", error);
      }
    };

    window.addEventListener(
      "serviceSelected",
      handleServiceSelection as EventListener
    );

    const storedService = localStorage.getItem("selectedService");
    if (storedService) {
      try {
        const serviceData = JSON.parse(storedService) as ServiceData;
        handleServiceSelection({ detail: serviceData } as CustomEvent);
        localStorage.removeItem("selectedService");
      } catch (error) {
        console.error("Error parsing stored service data:", error);
        localStorage.removeItem("selectedService");
      }
    }

    return () => {
      window.removeEventListener(
        "serviceSelected",
        handleServiceSelection as EventListener
      );
    };
  }, []);

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

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token && errors.captcha) {
      setErrors({ ...errors, captcha: undefined });
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
    setErrors({
      ...errors,
      captcha: "El captcha ha expirado. Por favor, verifica nuevamente.",
    });
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
    if (!captchaToken) {
      newErrors.captcha = "Por favor, verifica que no eres un robot";
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
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        budget: formData.budget || "No especificado",
        timeline: formData.timeline || "No especificado",
        service_type: selectedServiceData?.title || "Consulta general",
        service_base_price: selectedServiceData?.basePrice || "N/A",
        service_total_price: selectedServiceData?.totalPrice || "N/A",
        service_duration: selectedServiceData?.duration || "N/A",
        service_addons:
          selectedServiceData?.addOns &&
          Array.isArray(selectedServiceData.addOns)
            ? selectedServiceData.addOns
                .filter((addon) => addon && addon.name && addon.price)
                .map((addon) => `${addon.name} (${addon.price})`)
                .join(", ") || "Ninguno"
            : "Ninguno",
        addons_count:
          selectedServiceData?.addOns &&
          Array.isArray(selectedServiceData.addOns)
            ? selectedServiceData.addOns.filter((addon) => addon && addon.name)
                .length
            : 0,
        timestamp: new Date().toLocaleString("es-AR"),
        client_type: selectedServiceData
          ? "Cotización de Servicio"
          : "Consulta General",
        recaptcha_token: captchaToken,
      };

      console.log("Sending email via API...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      }

      if (result.success) {
        console.log("Email sent successfully via API");

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
        setCaptchaToken(null);
        recaptchaRef.current?.reset();

        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error(result.message || "Error desconocido");
      }
    } catch (error: any) {
      console.error("Error sending email:", error);

      let errorMessage = "Hubo un error al enviar el mensaje. ";

      if (error.message) {
        errorMessage += `${error.message} `;
      }

      if (
        error.message?.includes("App Password") ||
        error.message?.includes("credenciales")
      ) {
        errorMessage +=
          "\n\n📧 MÉTODO ALTERNATIVO:\nPuedes enviarme tu mensaje directamente a: matquadev@gmail.com";
        errorMessage += "\n\n💡 INCLUYE EN TU EMAIL:";
        errorMessage += `\n• Nombre: ${formData.name}`;
        errorMessage += `\n• Email: ${formData.email}`;
        errorMessage += `\n• Asunto: ${formData.subject}`;
        if (selectedServiceData) {
          errorMessage += `\n• Servicio: ${selectedServiceData.title}`;
          errorMessage += `\n• Presupuesto: ${selectedServiceData.totalPrice}`;
        }
        errorMessage += `\n• Mensaje: ${formData.message.substring(0, 100)}...`;
      } else {
        errorMessage +=
          "Por favor, intenta nuevamente o contáctame directamente a matquadev@gmail.com";
      }

      setSubmitError(errorMessage);

      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setCaptchaToken(null);

      console.error("Detailed error:", {
        error: error,
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background system - consistent with Services */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10" />

      {/* Minimal background decoration - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 sm:top-20 lg:top-32 left-10 sm:left-20 lg:left-32 w-32 sm:w-56 lg:w-80 h-32 sm:h-56 lg:h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 lg:bottom-32 right-10 sm:right-20 lg:right-32 w-40 sm:w-64 lg:w-96 h-40 sm:h-64 lg:h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
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
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Info - mobile optimized */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  {t("contact.info.title")}
                </h3>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
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
                        className="flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-300 group"
                      >
                        <div
                          className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {t(item.labelKey)}
                          </div>
                          <div className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                            {item.value || t(item.valueKey || "")}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links - mobile optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  {t("contact.social.title")}
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                        className={`flex items-center justify-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl text-gray-600 dark:text-gray-400 ${social.color} hover:shadow-md transition-all duration-300 group`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-1.5 sm:mr-2" />
                        <span className="font-medium text-xs sm:text-sm">
                          {social.name}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Form Section - mobile optimized */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Selected Service Banner - mobile optimized */}
              <AnimatePresence>
                {selectedServiceData && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mb-4 sm:mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg">
                          <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                            {selectedServiceData.title ||
                              "Servicio Seleccionado"}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 space-y-1 sm:space-y-0">
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <HiTag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              Base: {selectedServiceData.basePrice || "N/A"}
                            </span>
                            <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 flex items-center">
                              <HiClock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {selectedServiceData.duration || "A definir"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clearServiceSelection}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      >
                        <HiRefresh className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>

                    {selectedServiceData.addOns &&
                      Array.isArray(selectedServiceData.addOns) &&
                      selectedServiceData.addOns.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-blue-200 dark:border-blue-700 pt-3 sm:pt-4"
                        >
                          <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center">
                            <HiPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-green-500" />
                            Servicios adicionales incluidos:
                          </p>
                          <div className="space-y-2">
                            {selectedServiceData.addOns
                              .filter(
                                (addon) => addon && addon.name && addon.price
                              )
                              .map((addon, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2.5 sm:p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg sm:rounded-xl"
                                >
                                  <div className="flex-1">
                                    <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                                      {addon.name}
                                    </span>
                                    {addon.description && (
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                        {addon.description}
                                      </p>
                                    )}
                                  </div>
                                  <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 ml-3">
                                    {addon.price}
                                  </span>
                                </div>
                              ))}
                          </div>

                          {selectedServiceData.totalPrice && (
                            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white flex items-center">
                                  <HiCalculator className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                                  Total estimado:
                                </span>
                                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                                  {selectedServiceData.totalPrice}
                                </span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form - mobile optimized */}
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-6"
              >
                {/* Name and Email - mobile optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base ${
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
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base ${
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

                {/* Budget and Timeline - mobile optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.budget")}
                      {selectedServiceData && (
                        <span className="text-blue-600 dark:text-blue-400 ml-2 text-xs sm:text-sm">
                          (Estimado: {selectedServiceData.totalPrice})
                        </span>
                      )}
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:border-gray-400 text-sm sm:text-base"
                    >
                      <option value="">Selecciona un rango</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact.form.timeline")}
                      {selectedServiceData && (
                        <span className="text-blue-600 dark:text-blue-400 ml-2 text-xs sm:text-sm">
                          (Estimado: {selectedServiceData.duration})
                        </span>
                      )}
                    </label>
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:border-gray-400 text-sm sm:text-base"
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

                {/* Subject - mobile optimized */}
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base ${
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

                {/* Message - mobile optimized */}
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
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-sm sm:text-base ${
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

                {/* Google reCAPTCHA - mobile optimized */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <HiShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Verificación de seguridad *</span>
                    </div>
                  </label>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-center sm:justify-start">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                        }
                        onChange={handleCaptchaChange}
                        onExpired={handleCaptchaExpired}
                        theme="light"
                        size="normal"
                        className="transform scale-75 sm:scale-100 origin-center sm:origin-left"
                      />
                    </div>
                    {errors.captcha && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center"
                      >
                        <HiExclamationCircle className="w-4 h-4 mr-1" />
                        {errors.captcha}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Submit Button - mobile optimized */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 sm:py-4 px-6 sm:px-8 font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg ${
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
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <HiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        {selectedServiceData
                          ? `Solicitar cotización • ${selectedServiceData.totalPrice}`
                          : "Enviar mensaje"}
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Error Message - mobile optimized */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <div className="flex items-start space-x-2 text-red-800 dark:text-red-200">
                      <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-2">
                          Error al enviar mensaje
                        </div>
                        <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                          {submitError}
                        </div>
                        {submitError.includes("matquadev@gmail.com") && (
                          <motion.a
                            href="mailto:matquadev@gmail.com"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center mt-3 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            <HiMail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Abrir correo electrónico
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>

        {/* Success Message - Fixed positioning at bottom right */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-50 max-w-xs sm:max-w-sm"
            >
              <div className="bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center space-x-2 sm:space-x-3">
                <HiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    ¡Mensaje enviado!
                  </div>
                  <div className="text-xs sm:text-sm opacity-90">
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
