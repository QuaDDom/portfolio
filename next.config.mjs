/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry
  telemetry: false,

  // Explicitly disable all experimental features
  experimental: {
    optimizeCss: false,
    serverComponentsExternalPackages: [],
  },

  // Force disable CSS minification that requires critters
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Standard configuration
  poweredByHeader: false,
  reactStrictMode: true,

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Disable CSS optimization in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimizer: config.optimization.minimizer?.filter((plugin) => {
          return !plugin.constructor.name?.includes("OptimizeCss");
        }),
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
