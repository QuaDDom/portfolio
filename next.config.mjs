/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry
  telemetry: false,

  // Explicitly disable experimental optimizeCss
  experimental: {
    optimizeCss: false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  // Change output mode to export for static generation
  output: "export",
  trailingSlash: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Compress static assets
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
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
