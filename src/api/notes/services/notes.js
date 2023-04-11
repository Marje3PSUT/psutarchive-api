'use strict';

/**
 * notes service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notes.notes');
