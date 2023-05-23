module.exports = (policyContext, config, { strapi }) => {
    let obj = policyContext.request.body.data;

    if (typeof (obj) == 'string') {
        obj = JSON.parse(obj);
    }

    //console.log(obj);

    delete obj['publishedAt'];
    policyContext.request.body.data = JSON.stringify(Object.assign(obj, { publishedAt: null }));

    return true
};