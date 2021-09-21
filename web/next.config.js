const path = require("path");

const aliasPathsToResolve = [
  { name: "shared", path: path.resolve(__dirname, "../shared/") },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [path.resolve(__dirname, "../shared/")],
      use: [defaultLoaders.babel],
    });

    /** Resolve aliases */
    aliasPathsToResolve.forEach((module) => {
      config.resolve.alias[module.name] = module.path;
    });
    return config;
  },
};

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "interest-cohort=()",
  },
];
