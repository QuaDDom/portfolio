/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry
  telemetry: false,

  // Remove experimental optimizeCss - this is causing the critters error
  // experimental: {
  //   optimizeCss: true,
  // },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Output configuration for better static generation
  output: "standalone",

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
