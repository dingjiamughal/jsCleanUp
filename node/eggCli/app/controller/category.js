const BaseController = require('./base');

class CategoryController extends BaseController {
    async index() {
        try {
            let items = await this.getPager('Category', ['name']);
            this.success({items});
        }
        catch (e) {
            this.fail(e);
        }
    }

    async create() {
        const category = this.ctx.request.body;

        try {
            let doc = await this.ctx.model.Category.findOne(category);
            if (doc) {
                this.fail('此分类已经存在');
            }
            else {
                doc = await this.ctx.model.Category.create(category);
                this.success({name: doc.name});
            }
        }
        catch (e) {
            this.fail(e);
        }
    }

    async update() {
        const category = this.ctx.request.body;
        const id = this.ctx.params.id;
        try {
            const result = await this.ctx.model.Category.findByIdAndUpdate(id, category);
            this.success('更新成功');

        }
        catch (e) {
            this.faile(e);
        }
    }

    async destroy() {
        const category = this.ctx.request.body;
        const id = this.ctx.params.id;
        try {
            await this.ctx.model.Category.findByIdAndRemove(id);
            this.success('删除成功');
        }
        catch (e) {
            this.fail(e);
        }
    }
}

module.exports = CategoryController;
