const {Controller} = require('egg');

class BaseController extends Controller {
    async getPager(dbName, labels = []) {
        let {pageNum = 1, pageSize = 5, keyword = ''} = this.ctx.query;
        pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum, 10);
        pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize, 10);
        let query = {};
        if (keyword && labels.length > 0) {
            query.$or = labels.map(label => ({[label]: new RegExp(keyword)}));
        }

        const total = await this.ctx.model[dbName].count();
        const items = await this.ctx.model[dbName].find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
        return {
            items,
            total,
            pageNum,
            pageSize,
            pageCount: Math.ceil(total / pageSize)
        };
    }

    get user() {
        return this.ctx.session.user;
    }

    success(data) {
        this.ctx.body = {code: 0, status: 'success', data};
    }

    fail(error) {
        this.ctx.body = {code: 1, status: 'error', error};
    }
}

module.exports = BaseController;
