'use strict';
/**
 *  Resource controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::resource.resource', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx);
        const query = strapi.db.query('api::resource.resource');
        await Promise.all(
            data.map(async (item, index) => {
                const foundItem = await query.findOne({
                    where: {
                        id: item.id,
                    },
                    populate: ['createdBy'],
                });

                if (foundItem.createdByshowCredits !== null && foundItem.createdBy.showCredits)
                    data[index].attributes.createdBy = {
                        id: foundItem.createdBy.id,
                        firstname: foundItem.createdBy.firstname,
                        lastname: foundItem.createdBy.lastname,
                    };
            })
        );
        console.log(data)
        return { data, meta };
    },
}));