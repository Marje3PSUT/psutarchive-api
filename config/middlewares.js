module.exports = ({ env }) => [
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",

  {
    name: "global::rateLimit",

    config: {
      waitInterval: env("RATE_LIMIT_WAIT_INTERVAL", 2),
      maxRequests: env("RATE_LIMIT_MAX_REQUESTS", 10),
      endpoints: ['/api/']
    },
  },
];
