const {Controller} = require('egg');

class NewsController extends Controller {
    async index() {
        const news = [
            {
                name: 'baidu',
                url: 'https://www.baidu.com'
            },
            {
                name: 'baidu',
                url: 'https://www.baidu.com'
            }
        ]

        await this.ctx.render('news.ejs', {
            news
        });
    }
}

module.exports = NewsController;