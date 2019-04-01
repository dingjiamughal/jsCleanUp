const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const views = require('koa-views')
const path = require('path');
const app = new Koa();
const router = new Router();

// app.use(async (ctx, next) => {
//     console.log(ctx.request);
//     await next();
// });

// app.use(async (ctx, next) => {
//     if (ctx.request.url === '/index') {
//         console.log('ok');
//         ctx.body = 'hello index';
//     }

//     await next();
// });

app.use(static(path.resolve(__dirname, './public'), {
    extensions: 'pug'
}));

app.use(views(path.resolve(__dirname, './public'), {
    extension: 'pug'
}));


router.get('/index', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello shipsadfasdf!'
    });

    await next();
});

// router.get('/router', async (ctx, next) => {
//     console.log('router ok');
//     ctx.body = 'hello router';
//     await next();
// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => {
    console.log('server started on port 3002');
});
