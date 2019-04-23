const BaseController = require('./base');

class ArticleController extends BaseController {
    async index() {
        try {
            const result = await this.getPager('Article', ['title', 'content']);
            this.success(result);
        }
        catch (e) {
            this.fail(e);
        }
    }

    async create() {
        const article = this.ctx.request.body;
        article.user = this.user;
        console.log(this.user);
        try {
            const result = await this.ctx.model.Article.create(article);
            this.success('创建成功');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async update() {
        const id = this.ctx.params.id;
        const article = this.ctx.request.body;
        try {
            const result = await this.ctx.model.Article.findByIdAndUpdate(id, article);
            this.success('修改成功');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async destroy() {
        const id = this.ctx.params.id;
        const article = this.ctx.request.body;
        try {
            const result = await this.ctx.model.Article.findByIdAndRemove(id, article);
            this.success('删除成功');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async addPv() {
        const id = this.ctx.params.id;
        try {
            await this.ctx.model.Article.findByIdAndUpdate(id, {
                $inc: {pv: 1}
            });
            this.success('浏览+1');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async addComment() {
        const id = this.ctx.params.id;
        const comments = this.ctx.request.body;
        comments.user = this.user;
        try {
            await this.ctx.model.Article.findByIdAndUpdate(id, {
                $push: {
                    comments
                }
            });
            this.success('评论成功');
        }
        catch (e) {
            this.fail(e);
        }
    }
}

module.exports = ArticleController;
