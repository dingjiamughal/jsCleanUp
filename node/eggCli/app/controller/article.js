const BaseController = require('./base');

class ArticleController extends BaseController {
    async index() {
        const article = this.ctx.request.body;

        try {
            const result = await this.ctx.model.Article.find({});
            this.success(result);
        }
        catch (e) {
            this.fail(e);
        }
    }

    async create() {
        const article = this.ctx.request.body;
        try {
            const result = await this.ctx.model.Article.create(article);
            this.success('创建成功');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async update() {
        const article = this.ctx.request.body;
        const id = this.ctx.params.id;
        try {
            await this.ctx.model.Article.findByIdAndUpdate(id, article);
            this.success('修改成功');
        }
        catch (e) {
            this.fail(e);
        }
    }

    async destroy() {
        const id = this.ctx.params.id;
        try {
            await this.ctx.model.Article.findOneAndRemove(id);
            this.success('删除成功');
        }
        catch (e) {
            this.fail(e);
        }
    }
}

module.exports = ArticleController;