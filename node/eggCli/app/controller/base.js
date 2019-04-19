const {Controller} = require('egg');

class BaseController extends Controller {
    success(data) {
        this.ctx.body = {
            code: 0,
            status: 'success',
            data
        };
    }

    fail(error) {
        this.ctx.body = {
            code: 1,
            status: 'error',
            error
        };
    }
}

module.exports = BaseController;
