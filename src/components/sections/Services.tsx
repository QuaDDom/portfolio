"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  HiCheck,
  HiStar,
  HiLightningBolt,
  HiGlobe,
  HiShoppingCart,
  HiCode,
  HiArrowRight,
  HiClock,
  HiShieldCheck,
  HiPlus,
  HiMinus,
  HiEye,
  HiDesktopComputer,
  HiDeviceMobile,
  HiChartBar,
  HiX,
} from "react-icons/hi";

interface SelectedService {
  id: string;
  title: string;
  price: string;
  addOns: string[];
}

const servicesData = [
  {
    id: "landing",
    titleKey: "services.landing.title",
    subtitleKey: "services.landing.subtitle",
    descriptionKey: "services.landing.desc",
    price: "$399",
    originalPrice: "$599",
    duration: "5-7 días",
    popular: false,
    icon: HiGlobe,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Diseño responsive y moderno",
      "Optimización SEO básica",
      "Formulario de contacto integrado",
      "Animaciones suaves y atractivas",
      "Google Analytics incluido",
      "Hosting gratuito por 3 meses",
      "1 mes de soporte técnico",
      "2 rondas de revisiones",
    ],
    deliverables: [
      "Diseño personalizado",
      "Código optimizado",
      "Configuración hosting",
      "Documentación básica",
    ],
  },
  {
    id: "corporate",
    titleKey: "services.corporate.title",
    subtitleKey: "services.corporate.subtitle",
    descriptionKey: "services.corporate.desc",
    price: "$999",
    originalPrice: "$1,299",
    duration: "2-3 semanas",
    popular: true,
    icon: HiLightningBolt,
    color: "from-purple-500 to-pink-500",
    features: [
      "Hasta 8 páginas personalizadas",
      "CMS para gestión de contenido",
      "Blog integrado con SEO avanzado",
      "Panel de administración",
      "Múltiples formularios de contacto",
      "Integración con redes sociales",
      "Analytics y reportes detallados",
      "Hosting premium por 6 meses",
      "3 meses de soporte prioritario",
      "Revisiones ilimitadas",
    ],
    deliverables: [
      "Sitio web completo",
      "CMS configurado",
      "Capacitación del equipo",
      "Manual de uso",
      "SEO configurado",
    ],
  },
  {
    id: "ecommerce",
    titleKey: "services.ecommerce.title",
    subtitleKey: "services.ecommerce.subtitle",
    descriptionKey: "services.ecommerce.desc",
    price: "$1,899",
    originalPrice: "$2,499",
    duration: "3-5 semanas",
    popular: false,
    icon: HiShoppingCart,
    color: "from-green-500 to-emerald-500",
    features: [
      "Catálogo de productos ilimitado",
      "Carrito de compras avanzado",
      "Múltiples pasarelas de pago",
      "Panel de administración completo",
      "Gestión avanzada de inventario",
      "Sistema de cupones y promociones",
      "Reportes de ventas y analytics",
      "SEO para e-commerce",
      "Integración con sistemas de envío",
      "6 meses de soporte premium",
      "Capacitación completa del equipo",
    ],
    deliverables: [
      "Tienda online completa",
      "Configuración de pagos",
      "Productos cargados",
      "Capacitación vendedores",
      "Manual operativo",
    ],
  },
  {
    id: "custom",
    titleKey: "services.custom.title",
    subtitleKey: "services.custom.subtitle",
    descriptionKey: "services.custom.desc",
    price: "Desde $2,999",
    duration: "4-12 semanas",
    popular: false,
    icon: HiCode,
    color: "from-orange-500 to-red-500",
    features: [
      "Análisis completo de requerimientos",
      "Arquitectura escalable y robusta",
      "Base de datos optimizada",
      "API RESTful personalizada",
      "Autenticación y autorización avanzada",
      "Integración con servicios externos",
      "Panel administrativo personalizado",
      "Pruebas automatizadas",
      "Documentación técnica completa",
      "12 meses de soporte y mantenimiento",
      "Actualizaciones de seguridad incluidas",
    ],
    deliverables: [
      "Aplicación personalizada",
      "Código fuente",
      "Documentación técnica",
      "Plan de mantenimiento",
      "Capacitación técnica",
    ],
  },
];

const addOns = [
  {
    id: "seo",
    nameKey: "services.addon.seo",
    description: "Optimización completa para motores de búsqueda",
    detailedDescription:
      "Análisis de palabras clave, optimización técnica, creación de contenido SEO y configuración de herramientas de analytics para mejorar tu posicionamiento.",
    price: "$299",
    originalPrice: "$399",
    icon: HiChartBar,
    features: [
      "Análisis de palabras clave",
      "Optimización técnica",
      "Meta tags y estructura",
      "Sitemap y robots.txt",
      "Google Analytics & Search Console",
    ],
  },
  {
    id: "express",
    nameKey: "services.addon.express",
    description: "Reduce el tiempo de entrega en 50%",
    detailedDescription:
      "Equipo dedicado trabajando en modo prioritario para acelerar el desarrollo y entrega de tu proyecto sin comprometer la calidad.",
    price: "$199",
    originalPrice: "$299",
    icon: HiClock,
    features: [
      "Equipo dedicado",
      "Desarrollo prioritario",
      "Entregas parciales",
      "Comunicación diaria",
      "Revisiones aceleradas",
    ],
  },
  {
    id: "maintenance",
    nameKey: "services.addon.maintenance",
    description: "Soporte técnico y actualizaciones por 12 meses",
    detailedDescription:
      "Plan completo de mantenimiento que incluye actualizaciones de seguridad, backups automáticos, monitoreo 24/7 y soporte técnico prioritario.",
    price: "$399",
    originalPrice: "$599",
    icon: HiShieldCheck,
    features: [
      "Actualizaciones de seguridad",
      "Backups automáticos diarios",
      "Monitoreo 24/7",
      "Soporte técnico prioritario",
      "Reportes mensuales",
    ],
  },
];

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [expandedAddOn, setExpandedAddOn] = useState<string | null>(null);
  const [selectedService, setSelectedService] =
    useState<SelectedService | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = (servicePrice?: string) => {
    const basePrice = servicePrice
      ? parseInt(servicePrice.replace(/[^0-9]/g, "")) || 0
      : 0;
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn ? parseInt(addOn.price.replace("$", "")) : 0);
    }, 0);
    return basePrice + addOnsTotal;
  };

  const handleStartProject = (service: any) => {
    const basePrice = parseInt(service.price.replace(/[^0-9]/g, "")) || 0;
    const addOnsData = selectedAddOns
      .map((id) => {
        const addOn = addOns.find((a) => a.id === id);
        return addOn
          ? {
              id: addOn.id,
              name: t(addOn.nameKey),
              price: addOn.price,
              description: addOn.description,
            }
          : null;
      })
      .filter(Boolean);

    const totalPrice = calculateTotal(service.price);

    const selectedService: any = {
      id: service.id,
      title: t(service.titleKey),
      basePrice: service.price,
      totalPrice: `$${totalPrice.toLocaleString()}`,
      addOns: addOnsData,
      duration: service.duration,
      category: service.id,
    };

    // Store comprehensive service data
    localStorage.setItem("selectedService", JSON.stringify(selectedService));

    // Navigate to contact
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });

      // Dispatch enhanced event
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("serviceSelected", {
            detail: selectedService,
          })
        );
      }, 500);
    }
  };

  const handleServiceDetails = (service: any) => {
    setSelectedService({
      id: service.id,
      title: t(service.titleKey),
      price: service.price,
      addOns: [],
    });
    setShowServiceModal(true);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Simplified background system - consistent with About */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/20" />

      {/* Minimal background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with consistent styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t("services.subtitle")}
          </p>

          {/* Value Propositions with consistent styling */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: HiLightningBolt,
                titleKey: "services.value1.title",
                descKey: "services.value1.desc",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: HiShieldCheck,
                titleKey: "services.value2.title",
                descKey: "services.value2.desc",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: HiStar,
                titleKey: "services.value3.title",
                descKey: "services.value3.desc",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid with consistent card styling */}
        <div className="grid lg:grid-cols-4 gap-8 mb-20">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`group relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-8 border overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl ${
                  service.popular
                    ? "border-purple-500/30 ring-2 ring-purple-500/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <motion.div
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center shadow-lg">
                      <HiStar className="w-3 h-3 mr-1.5" />
                      {t("services.popular")}
                    </div>
                  </motion.div>
                )}

                {/* Icon */}
                <div className="relative z-10 mb-8">
                  <div
                    className={`inline-flex p-5 rounded-3xl bg-gradient-to-r ${service.color} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Header */}
                <div className="relative z-10 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-lg">
                    {t(service.subtitleKey)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>

                {/* Pricing */}
                <div className="relative z-10 mb-8 text-center py-4">
                  <div className="flex items-baseline justify-center mb-3">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {service.price}
                    </span>
                    {service.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-3">
                        {service.originalPrice}
                      </span>
                    )}
                  </div>
                  {selectedAddOns.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-3"
                    >
                      <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                        + Complementos: $
                        {selectedAddOns
                          .reduce((total, addOnId) => {
                            const addOn = addOns.find((a) => a.id === addOnId);
                            return (
                              total +
                              (addOn
                                ? parseInt(addOn.price.replace("$", ""))
                                : 0)
                            );
                          }, 0)
                          .toLocaleString()}
                      </div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        Total: ${calculateTotal(service.price).toLocaleString()}
                      </div>
                    </motion.div>
                  )}
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                    <HiClock className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="relative z-10 space-y-3 mb-8">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start group/feature"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiCheck className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 group-hover/feature:text-gray-800 dark:group-hover/feature:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                  {service.features.length > 4 && (
                    <motion.button
                      onClick={() => handleServiceDetails(service)}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 flex items-center px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <HiEye className="w-4 h-4 mr-2" />
                      Ver {service.features.length - 4} características más
                    </motion.button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartProject(service)}
                    className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl ${
                      service.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
                    }`}
                  >
                    <span>
                      {service.price.includes("Desde")
                        ? t("services.button.quote")
                        : t("services.button.start")}
                    </span>
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceDetails(service)}
                    className="w-full py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <HiEye className="w-4 h-4" />
                    <span>Ver detalles completos</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons Section with consistent styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("services.addons.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Potencia tu proyecto con nuestros complementos profesionales
            </p>
            {selectedAddOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg"
              >
                <HiCheck className="w-5 h-5 mr-2" />
                Total complementos: +${calculateTotal().toLocaleString()}
              </motion.div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => {
              const isSelected = selectedAddOns.includes(addon.id);
              const isExpanded = expandedAddOn === addon.id;

              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className={`group bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-8 border cursor-pointer transition-all duration-500 hover:shadow-xl ${
                    isSelected
                      ? "border-green-500/40 ring-2 ring-green-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300">
                      <addon.icon className="w-8 h-8 text-white" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
                        isSelected
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {isSelected ? (
                        <HiCheck className="w-5 h-5" />
                      ) : (
                        <HiPlus className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>

                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(addon.nameKey)}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    {addon.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {addon.price}
                      </span>
                      {addon.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-3">
                          {addon.originalPrice}
                        </span>
                      )}
                    </div>
                    {addon.originalPrice && (
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        AHORRA{" "}
                        {Math.round(
                          (1 -
                            parseInt(addon.price.replace("$", "")) /
                              parseInt(addon.originalPrice.replace("$", ""))) *
                            100
                        )}
                        %
                      </div>
                    )}
                  </div>

                  {/* Expandable Details */}
                  <motion.button
                    onClick={() =>
                      setExpandedAddOn(isExpanded ? null : addon.id)
                    }
                    whileHover={{ scale: 1.02 }}
                    className="w-full flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <span className="font-semibold">
                      Ver detalles completos
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HiArrowRight className="w-4 h-4 transform rotate-90" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                      >
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                          {addon.detailedDescription}
                        </p>
                        <div className="space-y-3">
                          <h5 className="text-gray-900 dark:text-white font-semibold text-sm mb-3">
                            Incluye:
                          </h5>
                          {addon.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <HiCheck className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section with consistent styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-white dark:bg-gray-800 rounded-3xl p-16 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("services.cta.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("services.cta.description")}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>{t("services.cta.button")}</span>
              <HiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("services.cta.portfolio")}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {showServiceModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowServiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              className="bg-gray-800/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-600/50"
              onClick={(e: any) => e.stopPropagation()}
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-4xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowServiceModal(false)}
                    className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <HiX className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <HiCheck className="w-6 h-6 text-green-400 mr-3" />
                      Características incluidas
                    </h4>
                    <div className="space-y-4">
                      {servicesData
                        .find((s) => s.id === selectedService.id)
                        ?.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start p-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <HiCheck className="w-5 h-5 text-green-400 mr-4 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 leading-relaxed">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <HiDesktopComputer className="w-6 h-6 text-blue-400 mr-3" />
                      Entregables
                    </h4>
                    <div className="space-y-4 mb-8">
                      {servicesData
                        .find((s) => s.id === selectedService.id)
                        ?.deliverables.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start p-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <HiDesktopComputer className="w-5 h-5 text-blue-400 mr-4 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 leading-relaxed">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const service = servicesData.find(
                          (s) => s.id === selectedService.id
                        );
                        if (service) {
                          handleStartProject(service);
                          setShowServiceModal(false);
                        }
                      }}
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">
                        Comenzar este proyecto
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
