"use strict";

const path = require("path");
const utils = require("@strapi/utils");
const { isString, toLower } = require("lodash/fp");
const { defaultsDeep } = require("lodash/fp");

const { RateLimitError } = utils.errors;

const defaults = {
  waitInterval: 5,
  maxRequests: 5,
  endpoints: ["/api/"],
};

module.exports =
  (config, { strapi }) =>
  async (ctx, next) => {
    const { maxRequests, waitInterval, endpoints } = defaultsDeep(
      defaults,
      config
    );

    const rateLimit = require("koa2-ratelimit").RateLimit;

    const userEmail = toLower(ctx.request.body.email) || "unknownEmail";
    const requestPath = isString(ctx.request.path)
      ? toLower(path.normalize(ctx.request.path)).replace(/\/$/, "")
      : "invalidPath";

    const loadConfig = {
      interval: { min: waitInterval },
      max: maxRequests,
      prefixKey: `${userEmail}:${requestPath}:${ctx.request.ip}`,
      handler() {
        throw new RateLimitError("Too many requests.");
      },
      ...config,
    };

    const isValidEndpoint = endpoints.some((endpoint) =>
      ctx.request.url.startsWith(endpoint)
    );

    if (!isValidEndpoint) {
      return next();
    }

    return rateLimit.middleware(loadConfig)(ctx, next);
  };
