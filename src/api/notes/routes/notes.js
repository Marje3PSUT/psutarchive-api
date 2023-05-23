'use strict';

/**
 * notes router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::notes.notes', {
    config: {
        create: {
            policies: ['global::create-draft']
        }
    }
});
