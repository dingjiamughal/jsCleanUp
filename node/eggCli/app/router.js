'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.post('/api/user/signup', controller.user.signup);
    router.post('/api/user/signin', controller.user.signin);
    router.post('/api/user/signout', controller.user.signout);

    router.resources('category', '/api/category', controller.category);
    router.resources('article', '/api/article', controller.article);

    router.get('/api/article/pv/:id', controller.article.addPv);
    router.post('/api/article/comment/:id', controller.article.addComment);
};


    // router.get('/api/categories', controller.categories.index);
    // router.post('/api/categories', controller.categories.create);
    // router.put('/api/categories/:id', controller.categories.update);
    // router.delete('/api/categories/:id', controller.categories.destroy);