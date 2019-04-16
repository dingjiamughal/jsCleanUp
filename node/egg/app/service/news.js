const {Service} = require('egg');
const moment = require('moment');
moment.locale('zh-cn')
class NewsService extends Service {
    async fetch() {
        // {headers, data}
        let {data} = await this.ctx.curl(this.config.news.url);
        data = data.toString();

        const news = [];
        const reg = /<a href="(http:\/\/baijiahao.baidu.com\/s\?id=[^"]+)".+>([\s\S]+?)<\/a>/g;
        data.replace(reg, (matched, url, title) => {
            if (!title.includes('img')) {
                news.push({
                    title,
                    url,
                    // time: this.ctx.helper.relative(new Date())
                    time: new Date()
                });
            }
        });

        return news;
    }
}

module.exports = NewsService;