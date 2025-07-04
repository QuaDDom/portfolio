"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Language {
  code: string;
  flag: string;
  name: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const languages: Language[] = [
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
];

// Complete translations object
const translations: Record<string, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.services": "Servicios",
    "nav.contact": "Contacto",

    // Theme
    "theme.light": "Claro",
    "theme.dark": "Oscuro",

    // Hero Section
    "hero.greeting": "Hola, soy",
    "hero.available": "Disponible para proyectos",
    "hero.description":
      "Transformo ideas en experiencias digitales excepcionales. Especializado en crear soluciones web modernas, elegantes y funcionales.",
    "hero.cta.projects": "Ver mis proyectos",
    "hero.cta.contact": "Contactar",
    "hero.roles.fullstack": "Desarrollador Full Stack",
    "hero.roles.designer": "Diseñador UI/UX",
    "hero.roles.creator": "Creador Digital",
    "hero.roles.innovator": "Innovador Tech",
    "hero.stats.projects": "Proyectos",
    "hero.stats.experience": "Años exp.",
    "hero.stats.satisfaction": "Satisfacción",
    "hero.scroll": "Scroll",

    // About Section
    "about.title": "Acerca de Mí",
    "about.subtitle":
      "Desarrollador apasionado por crear experiencias digitales que marquen la diferencia",
    "about.badge": "Desarrollador Full Stack",
    "about.main.title": "Transformando ideas en realidad digital",
    "about.main.description1":
      "¡Hola! Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Mi enfoque se centra en combinar tecnología de vanguardia con diseño intuitivo para desarrollar soluciones que realmente impacten.",
    "about.main.description2":
      "Con más de 3 años de experiencia, me especializo en el desarrollo full-stack, desde aplicaciones web modernas hasta APIs robustas. Cada proyecto es una oportunidad para innovar y superar expectativas.",
    "about.stats.projects": "Proyectos Completados",
    "about.stats.experience": "Años de Experiencia",
    "about.stats.clients": "Clientes Satisfechos",
    "about.stats.support": "Soporte Disponible",
    "about.highlight1.title": "Desarrollo Full Stack",
    "about.highlight1.desc":
      "Creación de aplicaciones web completas desde el frontend hasta el backend",
    "about.highlight2.title": "Soluciones Innovadoras",
    "about.highlight2.desc":
      "Implementación de tecnologías modernas para resolver problemas complejos",
    "about.highlight3.title": "Diseño Centrado en Usuario",
    "about.highlight3.desc":
      "Interfaces intuitivas que priorizan la experiencia del usuario",
    "about.highlight4.title": "Crecimiento Digital",
    "about.highlight4.desc":
      "Estrategias tecnológicas que impulsan el crecimiento de tu negocio",
    "about.cta.title": "¿Listo para llevar tu proyecto al siguiente nivel?",
    "about.cta.description":
      "Trabajemos juntos para transformar tu visión en una realidad digital que destaque en el mercado y genere resultados excepcionales.",
    "about.cta.button": "Comencemos a Trabajar",

    // Skills Section
    "skills.title": "Tecnologías y Herramientas",
    "skills.subtitle":
      "Stack tecnológico moderno para crear soluciones digitales robustas y escalables",
    "skills.category.all": "Todos",
    "skills.category.frontend": "Frontend",
    "skills.category.backend": "Backend",
    "skills.category.database": "Base de Datos",
    "skills.category.mobile": "Mobile",
    "skills.category.language": "Lenguaje",
    "skills.cta.title": "¿Necesitas alguna de estas tecnologías?",
    "skills.cta.description":
      "Estoy aquí para ayudarte a implementar la solución perfecta para tu proyecto",
    "skills.cta.button": "Hablemos de tu Proyecto",
    "skills.react.desc":
      "Biblioteca de JavaScript para construir interfaces de usuario interactivas y componentes reutilizables",
    "skills.nextjs.desc":
      "Framework de React para producción con renderizado híbrido, optimización automática y routing",
    "skills.typescript.desc":
      "Superset de JavaScript que añade tipado estático para mayor robustez y mantenibilidad",
    "skills.nodejs.desc":
      "Entorno de ejecución de JavaScript del lado del servidor para aplicaciones escalables",
    "skills.mongodb.desc":
      "Base de datos NoSQL orientada a documentos, perfecta para aplicaciones modernas",
    "skills.flutter.desc":
      "Framework de Google para crear aplicaciones móviles nativas multiplataforma",
    "skills.express.desc":
      "Framework web minimalista y flexible para Node.js, ideal para APIs RESTful",
    "skills.mysql.desc":
      "Sistema de gestión de bases de datos relacionales, robusto y confiable",
    "skills.javascript.desc":
      "Lenguaje de programación versátil, desde desarrollo web hasta aplicaciones móviles",

    // Projects Section
    "projects.title": "Proyectos Destacados",
    "projects.subtitle":
      "Una selección cuidadosa de proyectos que demuestran mi experiencia en diferentes tecnologías y sectores",
    "projects.featured": "Proyectos Destacados",
    "projects.category.all": "Todos",
    "projects.category.web": "Web Apps",
    "projects.category.mobile": "Mobile",
    "projects.category.api": "APIs",
    "projects.status.completed": "Completado",
    "projects.status.inprogress": "En Progreso",
    "projects.status.planned": "Planeado",
    "projects.button.view": "Ver Proyecto",
    "projects.button.code": "Código",
    "projects.modal.technologies": "Tecnologías Utilizadas",
    // Projects Section - Specific projects
    "projects.ecommerce.title": "Plataforma E-commerce",
    "projects.ecommerce.description":
      "Plataforma completa de comercio electrónico con panel de administración",
    "projects.ecommerce.longDescription":
      "Una solución completa de e-commerce desarrollada con Next.js y Stripe, incluyendo gestión de inventario, procesamiento de pagos y analytics en tiempo real.",
    "projects.taskmanagement.title": "App de Gestión de Tareas",
    "projects.taskmanagement.description":
      "Aplicación de gestión de tareas con colaboración en tiempo real",
    "projects.taskmanagement.longDescription":
      "App de productividad con funciones avanzadas de colaboración, notificaciones push y sincronización en la nube.",

    // Services Section
    "services.title": "Servicios de Desarrollo",
    "services.subtitle":
      "Desde una idea hasta una plataforma completa. Cada proyecto está diseñado para superar expectativas y generar resultados excepcionales.",
    "services.value1.title": "Entrega Rápida",
    "services.value1.desc": "Proyectos completados en tiempo récord",
    "services.value2.title": "Calidad Garantizada",
    "services.value2.desc": "Código limpio y optimizado",
    "services.value3.title": "Soporte Continuo",
    "services.value3.desc": "Acompañamiento post-lanzamiento",
    "services.popular": "Más Popular",
    "services.landing.title": "Landing Page",
    "services.landing.subtitle": "Presencia digital profesional",
    "services.landing.desc":
      "Página única optimizada para conversión y captación de leads",
    "services.corporate.title": "Sitio Corporativo",
    "services.corporate.subtitle": "Solución empresarial completa",
    "services.corporate.desc":
      "Presencia digital integral para empresas que buscan destacar",
    "services.ecommerce.title": "E-commerce",
    "services.ecommerce.subtitle": "Tienda online profesional",
    "services.ecommerce.desc":
      "Plataforma completa para vender productos online con todas las funcionalidades",
    "services.custom.title": "Desarrollo Personalizado",
    "services.custom.subtitle": "Solución a tu medida",
    "services.custom.desc":
      "Aplicación web completamente personalizada según tus necesidades específicas",
    "services.button.start": "Comenzar Proyecto",
    "services.button.quote": "Solicitar Cotización",
    "services.addons.title": "Servicios Adicionales",
    "services.addon.seo": "SEO Avanzado",
    "services.addon.express": "Entrega Express",
    "services.addon.maintenance": "Mantenimiento Anual",
    "services.cta.title": "¿No encuentras lo que buscas?",
    "services.cta.description":
      "Cada proyecto es único. Conversemos sobre tus necesidades específicas y creemos una solución personalizada que se adapte perfectamente a tu visión.",
    "services.cta.button": "Conversemos tu Proyecto",
    "services.cta.portfolio": "Ver Portfolio Completo",

    // Contact Section
    "contact.title": "Hablemos de tu Proyecto",
    "contact.subtitle":
      "¿Tienes una idea en mente? Me encantaría escucharla y ayudarte a convertirla en realidad. Conversemos sobre cómo podemos trabajar juntos.",
    "contact.info.title": "Información de Contacto",
    "contact.social.title": "Sígueme en Redes",
    "contact.form.name": "Nombre Completo",
    "contact.form.email": "Email",
    "contact.form.budget": "Presupuesto Estimado",
    "contact.form.timeline": "Tiempo de Entrega",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.captcha": "Verificación de Seguridad",
    "contact.form.submit": "Enviar Mensaje",
    "contact.form.sending": "Enviando...",
    "contact.form.placeholder.name": "Tu nombre completo",
    "contact.form.placeholder.email": "tu@email.com",
    "contact.form.placeholder.subject": "¿En qué puedo ayudarte?",
    "contact.form.placeholder.message":
      "Cuéntame sobre tu proyecto, ideas, objetivos, y cualquier detalle que consideres importante...",
    "contact.form.placeholder.captcha": "?",
    "contact.success.title": "¡Mensaje enviado!",
    "contact.success.description": "Te responderé pronto",
    "contact.labels.email": "Email",
    "contact.labels.phone": "Teléfono",
    "contact.labels.location": "Ubicación",
    "contact.labels.schedule": "Horario",
    "contact.values.schedule": "Lun - Vie: 9:00 - 18:00",

    // Footer
    "footer.description":
      "Desarrollador Full Stack especializado en crear experiencias digitales excepcionales que transforman ideas en realidades tecnológicas impactantes.",
    "footer.nav.title": "Navegación",
    "footer.services.title": "Servicios",
    "footer.services.web": "Desarrollo Web",
    "footer.services.mobile": "Aplicaciones Móviles",
    "footer.services.ecommerce": "E-commerce",
    "footer.services.api": "APIs Personalizadas",
    "footer.services.consulting": "Consultoría Tech",
    "footer.services.maintenance": "Mantenimiento",
    "footer.tech.title": "Tecnologías",
    "footer.tech.react": "React & Next.js",
    "footer.tech.node": "Node.js & Express",
    "footer.tech.typescript": "TypeScript",
    "footer.tech.databases": "MongoDB & MySQL",
    "footer.tech.flutter": "Flutter",
    "footer.tech.all": "Ver todas",
    "footer.cta.title": "¿Listo para tu próximo proyecto?",
    "footer.cta.description":
      "Conversemos sobre cómo puedo ayudarte a alcanzar tus objetivos digitales.",
    "footer.cta.button": "Comencemos a Trabajar",
    "footer.copyright": "Diseñado y desarrollado con",
    "footer.location": "en Córdoba, Argentina.",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.services": "Services",
    "nav.contact": "Contact",

    // Theme
    "theme.light": "Light",
    "theme.dark": "Dark",

    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.available": "Available for projects",
    "hero.description":
      "I transform ideas into exceptional digital experiences. Specialized in creating modern, elegant and functional web solutions.",
    "hero.cta.projects": "View my projects",
    "hero.cta.contact": "Contact",
    "hero.roles.fullstack": "Full Stack Developer",
    "hero.roles.designer": "UI/UX Designer",
    "hero.roles.creator": "Digital Creator",
    "hero.roles.innovator": "Tech Innovator",
    "hero.stats.projects": "Projects",
    "hero.stats.experience": "Years exp.",
    "hero.stats.satisfaction": "Satisfaction",
    "hero.scroll": "Scroll",

    // About Section
    "about.title": "About Me",
    "about.subtitle":
      "Developer passionate about creating digital experiences that make a difference",
    "about.badge": "Full Stack Developer",
    "about.main.title": "Transforming ideas into digital reality",
    "about.main.description1":
      "Hello! I'm a developer passionate about creating exceptional digital experiences. My focus is on combining cutting-edge technology with intuitive design to develop solutions that really make an impact.",
    "about.main.description2":
      "With over 3 years of experience, I specialize in full-stack development, from modern web applications to robust APIs. Each project is an opportunity to innovate and exceed expectations.",
    "about.stats.projects": "Projects Completed",
    "about.stats.experience": "Years of Experience",
    "about.stats.clients": "Satisfied Clients",
    "about.stats.support": "Support Available",
    "about.highlight1.title": "Full Stack Development",
    "about.highlight1.desc":
      "Creating complete web applications from frontend to backend",
    "about.highlight2.title": "Innovative Solutions",
    "about.highlight2.desc":
      "Implementing modern technologies to solve complex problems",
    "about.highlight3.title": "User-Centered Design",
    "about.highlight3.desc":
      "Intuitive interfaces that prioritize user experience",
    "about.highlight4.title": "Digital Growth",
    "about.highlight4.desc":
      "Technology strategies that drive your business growth",
    "about.cta.title": "Ready to take your project to the next level?",
    "about.cta.description":
      "Let's work together to transform your vision into a digital reality that stands out in the market and generates exceptional results.",
    "about.cta.button": "Let's Start Working",

    // Skills Section
    "skills.title": "Technologies and Tools",
    "skills.subtitle":
      "Modern technology stack to create robust and scalable digital solutions",
    "skills.category.all": "All",
    "skills.category.frontend": "Frontend",
    "skills.category.backend": "Backend",
    "skills.category.database": "Database",
    "skills.category.mobile": "Mobile",
    "skills.category.language": "Language",
    "skills.cta.title": "Need any of these technologies?",
    "skills.cta.description":
      "I'm here to help you implement the perfect solution for your project",
    "skills.cta.button": "Let's Talk About Your Project",
    "skills.react.desc":
      "JavaScript library for building interactive user interfaces and reusable components",
    "skills.nextjs.desc":
      "React framework for production with hybrid rendering, automatic optimization and routing",
    "skills.typescript.desc":
      "JavaScript superset that adds static typing for greater robustness and maintainability",
    "skills.nodejs.desc":
      "JavaScript runtime environment on the server side for scalable applications",
    "skills.mongodb.desc":
      "Document-oriented NoSQL database, perfect for modern applications",
    "skills.flutter.desc":
      "Google framework for creating native cross-platform mobile applications",
    "skills.express.desc":
      "Minimalist and flexible web framework for Node.js, ideal for RESTful APIs",
    "skills.mysql.desc":
      "Robust and reliable relational database management system",
    "skills.javascript.desc":
      "Versatile programming language, from web development to mobile applications",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle":
      "A careful selection of projects that demonstrate my experience in different technologies and sectors",
    "projects.featured": "Featured Projects",
    "projects.category.all": "All",
    "projects.category.web": "Web Apps",
    "projects.category.mobile": "Mobile",
    "projects.category.api": "APIs",
    "projects.status.completed": "Completed",
    "projects.status.inprogress": "In Progress",
    "projects.status.planned": "Planned",
    "projects.button.view": "View Project",
    "projects.button.code": "Code",
    "projects.modal.technologies": "Technologies Used",
    // Projects Section - Specific projects
    "projects.ecommerce.title": "E-commerce Platform",
    "projects.ecommerce.description":
      "Complete e-commerce platform with admin panel",
    "projects.ecommerce.longDescription":
      "A complete e-commerce solution built with Next.js and Stripe, including inventory management, payment processing and real-time analytics.",
    "projects.taskmanagement.title": "Task Management App",
    "projects.taskmanagement.description":
      "Task management application with real-time collaboration",
    "projects.taskmanagement.longDescription":
      "Productivity app with advanced collaboration features, push notifications and cloud synchronization.",

    // Services Section
    "services.title": "Development Services",
    "services.subtitle":
      "From an idea to a complete platform. Each project is designed to exceed expectations and generate exceptional results.",
    "services.value1.title": "Fast Delivery",
    "services.value1.desc": "Projects completed in record time",
    "services.value2.title": "Guaranteed Quality",
    "services.value2.desc": "Clean and optimized code",
    "services.value3.title": "Continuous Support",
    "services.value3.desc": "Post-launch support",
    "services.popular": "Most Popular",
    "services.landing.title": "Landing Page",
    "services.landing.subtitle": "Professional digital presence",
    "services.landing.desc":
      "Single page optimized for conversion and lead capture",
    "services.corporate.title": "Corporate Website",
    "services.corporate.subtitle": "Complete business solution",
    "services.corporate.desc":
      "Comprehensive digital presence for companies looking to stand out",
    "services.ecommerce.title": "E-commerce",
    "services.ecommerce.subtitle": "Professional online store",
    "services.ecommerce.desc":
      "Complete platform to sell products online with all functionalities",
    "services.custom.title": "Custom Development",
    "services.custom.subtitle": "Solution tailored to you",
    "services.custom.desc":
      "Completely customized web application according to your specific needs",
    "services.button.start": "Start Project",
    "services.button.quote": "Request Quote",
    "services.addons.title": "Additional Services",
    "services.addon.seo": "Advanced SEO",
    "services.addon.express": "Express Delivery",
    "services.addon.maintenance": "Annual Maintenance",
    "services.cta.title": "Can't find what you're looking for?",
    "services.cta.description":
      "Each project is unique. Let's talk about your specific needs and create a customized solution that perfectly fits your vision.",
    "services.cta.button": "Let's Discuss Your Project",
    "services.cta.portfolio": "View Complete Portfolio",

    // Contact Section
    "contact.title": "Let's Talk About Your Project",
    "contact.subtitle":
      "Do you have an idea in mind? I'd love to hear it and help you turn it into reality. Let's talk about how we can work together.",
    "contact.info.title": "Contact Information",
    "contact.social.title": "Follow Me on Social Media",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email",
    "contact.form.budget": "Estimated Budget",
    "contact.form.timeline": "Timeline",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.captcha": "Security Verification",
    "contact.form.submit": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.placeholder.name": "Your full name",
    "contact.form.placeholder.email": "your@email.com",
    "contact.form.placeholder.subject": "How can I help you?",
    "contact.form.placeholder.message":
      "Tell me about your project, ideas, goals, and any details you consider important...",
    "contact.form.placeholder.captcha": "?",
    "contact.success.title": "Message sent!",
    "contact.success.description": "I'll get back to you soon",
    "contact.labels.email": "Email",
    "contact.labels.phone": "Phone",
    "contact.labels.location": "Location",
    "contact.labels.schedule": "Schedule",
    "contact.values.schedule": "Mon - Fri: 9:00 - 18:00",

    // Footer
    "footer.description":
      "Full Stack Developer specialized in creating exceptional digital experiences that transform ideas into impactful technological realities.",
    "footer.nav.title": "Navigation",
    "footer.services.title": "Services",
    "footer.services.web": "Web Development",
    "footer.services.mobile": "Mobile Applications",
    "footer.services.ecommerce": "E-commerce",
    "footer.services.api": "Custom APIs",
    "footer.services.consulting": "Tech Consulting",
    "footer.services.maintenance": "Maintenance",
    "footer.tech.title": "Technologies",
    "footer.tech.react": "React & Next.js",
    "footer.tech.node": "Node.js & Express",
    "footer.tech.typescript": "TypeScript",
    "footer.tech.databases": "MongoDB & MySQL",
    "footer.tech.flutter": "Flutter",
    "footer.tech.all": "View all",
    "footer.cta.title": "Ready for your next project?",
    "footer.cta.description":
      "Let's talk about how I can help you achieve your digital goals.",
    "footer.cta.button": "Let's Start Working",
    "footer.copyright": "Designed and developed with",
    "footer.location": "in Córdoba, Argentina.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "Chi Sono",
    "nav.skills": "Competenze",
    "nav.projects": "Progetti",
    "nav.services": "Servizi",
    "nav.contact": "Contatti",

    // Theme
    "theme.light": "Chiaro",
    "theme.dark": "Scuro",

    // Hero Section
    "hero.greeting": "Ciao, sono",
    "hero.available": "Disponibile per progetti",
    "hero.description":
      "Trasformo idee in esperienze digitali eccezionali. Specializzato nella creazione di soluzioni web moderne, eleganti e funzionali.",
    "hero.cta.projects": "Vedi i miei progetti",
    "hero.cta.contact": "Contattami",
    "hero.roles.fullstack": "Sviluppatore Full Stack",
    "hero.roles.designer": "Designer UI/UX",
    "hero.roles.creator": "Creatore Digitale",
    "hero.roles.innovator": "Innovatore Tech",
    "hero.stats.projects": "Progetti",
    "hero.stats.experience": "Anni exp.",
    "hero.stats.satisfaction": "Soddisfazione",
    "hero.scroll": "Scorri",

    // About Section
    "about.title": "Chi Sono",
    "about.subtitle":
      "Sviluppatore appassionato di creare esperienze digitali che fanno la differenza",
    "about.badge": "Sviluppatore Full Stack",
    "about.main.title": "Trasformando idee in realtà digitale",
    "about.main.description1":
      "Ciao! Sono uno sviluppatore appassionato di creare esperienze digitali eccezionali. Il mio focus è combinare tecnologia all'avanguardia con design intuitivo per sviluppare soluzioni che abbiano davvero un impatto.",
    "about.main.description2":
      "Con oltre 3 anni di esperienza, mi specializzo nello sviluppo full-stack, dalle applicazioni web moderne alle API robuste. Ogni progetto è un'opportunità per innovare e superare le aspettative.",
    "about.stats.projects": "Progetti Completati",
    "about.stats.experience": "Anni di Esperienza",
    "about.stats.clients": "Clienti Soddisfatti",
    "about.stats.support": "Supporto Disponibile",
    "about.highlight1.title": "Sviluppo Full Stack",
    "about.highlight1.desc":
      "Creazione di applicazioni web complete dal frontend al backend",
    "about.highlight2.title": "Soluzioni Innovative",
    "about.highlight2.desc":
      "Implementazione di tecnologie moderne per risolvere problemi complessi",
    "about.highlight3.title": "Design Centrato sull'Utente",
    "about.highlight3.desc":
      "Interfacce intuitive che danno priorità all'esperienza utente",
    "about.highlight4.title": "Crescita Digitale",
    "about.highlight4.desc":
      "Strategie tecnologiche che guidano la crescita del tuo business",
    "about.cta.title":
      "Pronto a portare il tuo progetto al livello successivo?",
    "about.cta.description":
      "Lavoriamo insieme per trasformare la tua visione in una realtà digitale che si distingue nel mercato e genera risultati eccezionali.",
    "about.cta.button": "Iniziamo a Lavorare",

    // Skills Section
    "skills.title": "Tecnologie e Strumenti",
    "skills.subtitle":
      "Stack tecnologico moderno per creare soluzioni digitali robuste e scalabili",
    "skills.category.all": "Tutti",
    "skills.category.frontend": "Frontend",
    "skills.category.backend": "Backend",
    "skills.category.database": "Database",
    "skills.category.mobile": "Mobile",
    "skills.category.language": "Linguaggio",
    "skills.cta.title": "Hai bisogno di qualcuna di queste tecnologie?",
    "skills.cta.description":
      "Sono qui per aiutarti a implementare la soluzione perfetta per il tuo progetto",
    "skills.cta.button": "Parliamo del Tuo Progetto",
    "skills.react.desc":
      "Libreria JavaScript per costruire interfacce utente interattive e componenti riutilizzabili",
    "skills.nextjs.desc":
      "Framework React per produzione con rendering ibrido, ottimizzazione automatica e routing",
    "skills.typescript.desc":
      "Superset di JavaScript che aggiunge tipizzazione statica per maggiore robustezza e manutenibilità",
    "skills.nodejs.desc":
      "Ambiente di runtime JavaScript lato server per applicazioni scalabili",
    "skills.mongodb.desc":
      "Database NoSQL orientato ai documenti, perfetto per applicazioni moderne",
    "skills.flutter.desc":
      "Framework Google per creare applicazioni mobili native multipiattaforma",
    "skills.express.desc":
      "Framework web minimalista e flessibile per Node.js, ideale per API RESTful",
    "skills.mysql.desc":
      "Sistema di gestione database relazionale robusto e affidabile",
    "skills.javascript.desc":
      "Linguaggio di programmazione versatile, dallo sviluppo web alle applicazioni mobili",

    // Projects Section
    "projects.title": "Progetti in Evidenza",
    "projects.subtitle":
      "Una selezione accurata di progetti che dimostrano la mia esperienza in diverse tecnologie e settori",
    "projects.featured": "Progetti in Evidenza",
    "projects.category.all": "Tutti",
    "projects.category.web": "Web Apps",
    "projects.category.mobile": "Mobile",
    "projects.category.api": "APIs",
    "projects.status.completed": "Completato",
    "projects.status.inprogress": "In Corso",
    "projects.status.planned": "Pianificato",
    "projects.button.view": "Vedi Progetto",
    "projects.button.code": "Codice",
    "projects.modal.technologies": "Tecnologie Utilizzate",
    // Projects Section - Specific projects
    "projects.ecommerce.title": "Piattaforma E-commerce",
    "projects.ecommerce.description":
      "Piattaforma e-commerce completa con pannello di amministrazione",
    "projects.ecommerce.longDescription":
      "Una soluzione e-commerce completa sviluppata con Next.js e Stripe, inclusa gestione inventario, elaborazione pagamenti e analytics in tempo reale.",
    "projects.taskmanagement.title": "App Gestione Attività",
    "projects.taskmanagement.description":
      "Applicazione di gestione attività con collaborazione in tempo reale",
    "projects.taskmanagement.longDescription":
      "App di produttività con funzioni avanzate di collaborazione, notifiche push e sincronizzazione cloud.",

    // Services Section
    "services.title": "Servizi di Sviluppo",
    "services.subtitle":
      "Da un'idea a una piattaforma completa. Ogni progetto è progettato per superare le aspettative e generare risultati eccezionali.",
    "services.value1.title": "Consegna Veloce",
    "services.value1.desc": "Progetti completati in tempi record",
    "services.value2.title": "Qualità Garantita",
    "services.value2.desc": "Codice pulito e ottimizzato",
    "services.value3.title": "Supporto Continuo",
    "services.value3.desc": "Accompagnamento post-lancio",
    "services.popular": "Più Popolare",
    "services.landing.title": "Landing Page",
    "services.landing.subtitle": "Presenza digitale professionale",
    "services.landing.desc":
      "Pagina singola ottimizzata per conversione e cattura lead",
    "services.corporate.title": "Sito Aziendale",
    "services.corporate.subtitle": "Soluzione aziendale completa",
    "services.corporate.desc":
      "Presenza digitale integrale per aziende che vogliono distinguersi",
    "services.ecommerce.title": "E-commerce",
    "services.ecommerce.subtitle": "Negozio online professionale",
    "services.ecommerce.desc":
      "Piattaforma completa per vendere prodotti online con tutte le funzionalità",
    "services.custom.title": "Sviluppo Personalizzato",
    "services.custom.subtitle": "Soluzione su misura",
    "services.custom.desc":
      "Applicazione web completamente personalizzata secondo le tue esigenze specifiche",
    "services.button.start": "Inizia Progetto",
    "services.button.quote": "Richiedi Preventivo",
    "services.addons.title": "Servizi Aggiuntivi",
    "services.addon.seo": "SEO Avanzato",
    "services.addon.express": "Consegna Express",
    "services.addon.maintenance": "Manutenzione Annuale",
    "services.cta.title": "Non trovi quello che cerchi?",
    "services.cta.description":
      "Ogni progetto è unico. Parliamo delle tue esigenze specifiche e creiamo una soluzione personalizzata che si adatti perfettamente alla tua visione.",
    "services.cta.button": "Parliamo del Tuo Progetto",
    "services.cta.portfolio": "Vedi Portfolio Completo",

    // Contact Section
    "contact.title": "Parliamo del Tuo Progetto",
    "contact.subtitle":
      "Hai un'idea in mente? Mi piacerebbe sentirla e aiutarti a trasformarla in realtà. Parliamo di come possiamo lavorare insieme.",
    "contact.info.title": "Informazioni di Contatto",
    "contact.social.title": "Seguimi sui Social",
    "contact.form.name": "Nome Completo",
    "contact.form.email": "Email",
    "contact.form.budget": "Budget Stimato",
    "contact.form.timeline": "Tempi di Consegna",
    "contact.form.subject": "Oggetto",
    "contact.form.message": "Messaggio",
    "contact.form.captcha": "Verifica di Sicurezza",
    "contact.form.submit": "Invia Messaggio",
    "contact.form.sending": "Invio...",
    "contact.form.placeholder.name": "Il tuo nome completo",
    "contact.form.placeholder.email": "tua@email.com",
    "contact.form.placeholder.subject": "Come posso aiutarti?",
    "contact.form.placeholder.message":
      "Raccontami del tuo progetto, idee, obiettivi e qualsiasi dettaglio che ritieni importante...",
    "contact.form.placeholder.captcha": "?",
    "contact.success.title": "Messaggio inviato!",
    "contact.success.description": "Ti risponderò presto",
    "contact.labels.email": "Email",
    "contact.labels.phone": "Telefono",
    "contact.labels.location": "Posizione",
    "contact.labels.schedule": "Orario",
    "contact.values.schedule": "Lun - Ven: 9:00 - 18:00",

    // Footer
    "footer.description":
      "Sviluppatore Full Stack specializzato nella creazione di esperienze digitali eccezionali che trasformano idee in realtà tecnologiche d'impatto.",
    "footer.nav.title": "Navigazione",
    "footer.services.title": "Servizi",
    "footer.services.web": "Sviluppo Web",
    "footer.services.mobile": "Applicazioni Mobili",
    "footer.services.ecommerce": "E-commerce",
    "footer.services.api": "API Personalizzate",
    "footer.services.consulting": "Consulenza Tech",
    "footer.services.maintenance": "Manutenzione",
    "footer.tech.title": "Tecnologie",
    "footer.tech.react": "React & Next.js",
    "footer.tech.node": "Node.js & Express",
    "footer.tech.typescript": "TypeScript",
    "footer.tech.databases": "MongoDB & MySQL",
    "footer.tech.flutter": "Flutter",
    "footer.tech.all": "Vedi tutte",
    "footer.cta.title": "Pronto per il tuo prossimo progetto?",
    "footer.cta.description":
      "Parliamo di come posso aiutarti a raggiungere i tuoi obiettivi digitali.",
    "footer.cta.button": "Iniziamo a Lavorare",
    "footer.copyright": "Progettato e sviluppato con",
    "footer.location": "a Córdoba, Argentina.",
    "footer.privacy": "Politica sulla Privacy",
    "footer.terms": "Termini di Servizio",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Detect language from URL first
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";
    let detectedLang = null;

    if (currentPath.startsWith("/en")) {
      detectedLang = languages.find((lang) => lang.code === "en");
    } else if (currentPath.startsWith("/it")) {
      detectedLang = languages.find((lang) => lang.code === "it");
    } else {
      detectedLang = languages.find((lang) => lang.code === "es");
    }

    if (detectedLang) {
      setCurrentLanguage(detectedLang);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", detectedLang.code);
      }
      return;
    }

    // Check localStorage for saved language only if not detected from URL
    if (typeof window !== "undefined") {
      const savedLanguageCode = localStorage.getItem("language");
      if (savedLanguageCode) {
        const savedLanguage = languages.find(
          (lang) => lang.code === savedLanguageCode
        );
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage);
        }
      } else {
        // Try to detect browser language
        const browserLanguage = navigator.language.split("-")[0];
        const detectedLanguage = languages.find(
          (lang) => lang.code === browserLanguage
        );
        if (detectedLanguage) {
          setCurrentLanguage(detectedLanguage);
        }
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    if (!mounted) return;

    setCurrentLanguage(language);

    if (typeof window !== "undefined") {
      localStorage.setItem("language", language.code);

      // NO HACER NAVEGACIÓN AUTOMÁTICA
      // Solo guardamos el idioma en localStorage y actualizamos el estado
      // Las rutas /en y /it son solo para SEO, no para navegación en tiempo real
    }
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code]?.[key];
    return translation || key;
  };

  const value = {
    currentLanguage,
    setLanguage,
    t,
    mounted,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { languages };
