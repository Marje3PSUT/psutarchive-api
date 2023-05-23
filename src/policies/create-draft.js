module.exports = (policyContext, config, { strapi }) => {
    let obj = JSON.parse(policyContext.request.body.data);
    delete obj['publishedAt'];
    policyContext.request.body.data = JSON.stringify(Object.assign(obj, { publishedAt: null }));
    return true
};