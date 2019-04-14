const {Controller} = require('egg');

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hello world';
    }
}

module.exports = HomeController;