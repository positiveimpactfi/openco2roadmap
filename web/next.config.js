const { resolve } = require("path");

const aliasPathsToResolve = [
  { name: "shared", path: resolve(__dirname, "../shared/") },
];

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "interest-cohort=()",
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [resolve(__dirname, "../shared/")],
      use: [defaultLoaders.babel],
    });

    /** Resolve aliases */
    aliasPathsToResolve.forEach((module) => {
      config.resolve.alias[module.name] = module.path;
    });
    return config;
  },
};

module.exports = nextConfig;
