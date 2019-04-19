const BaseController = require('./base');

class CategoryController extends BaseController {
    // constructor() {
    //     super();
    //     this.category = this.ctx.request.body;
    // }

    async index() {
        let {pageNum, pageSize, keyword} = this.ctx.request.query;
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
        pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize);
        let query = {};
        if (keyword) {
            query.name = new RegExp(keyword);
        }
        try {
            let items = await this.ctx.model.Category.find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
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
            let doc = await this.ctx.model.Category.findOne(category);

            if (doc) {
                this.fail('名字已经有了，请换一个');
            }
            else {
                const result = await this.ctx.model.Category.findByIdAndUpdate(id, category);
                this.success('更新成功');
            }
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
