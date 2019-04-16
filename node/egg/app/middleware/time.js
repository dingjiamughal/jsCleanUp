module.exports = (options, app) => {
    return async function (ctx, next) {
        console.log(options.prefix);
        await next();
    };
};
