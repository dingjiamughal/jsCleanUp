const {Controller} = require('egg');

class NewsController extends Controller {
    async index() {
        // const news = [
        //     {
        //         name: 'baidu',
        //         url: 'https://www.baidu.com'
        //     },
        //     {
        //         name: 'baidu',
        //         url: 'https://www.baidu.com'
        //     }
        // ];

        const news = await this.ctx.service.news.fetch();

        await this.ctx.render('news.pug', {
            news
        });
    }
}

module.exports = NewsController;