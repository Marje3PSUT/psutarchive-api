'use strict';

/**
 * quiz service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quiz.quiz');
