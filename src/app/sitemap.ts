import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mateoquadrelli.com";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/#about",
    "/#skills",
    "/#projects",
    "/#services",
    "/#contact",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add Spanish routes (default, no prefix)
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : route.includes("#projects") ? 0.95 : 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
          it: `${baseUrl}/it${route}`,
        },
      },
    });
  });

  // Add English routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}/en${route}`,
      lastModified: currentDate,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 0.9 : route.includes("#projects") ? 0.85 : 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
          it: `${baseUrl}/it${route}`,
        },
      },
    });
  });

  // Add Italian routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}/it${route}`,
      lastModified: currentDate,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 0.9 : route.includes("#projects") ? 0.85 : 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
          it: `${baseUrl}/it${route}`,
        },
      },
    });
  });

  return sitemap;
}
