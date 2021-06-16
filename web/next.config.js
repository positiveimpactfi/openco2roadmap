module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "interest-cohort=()",
  },
];
