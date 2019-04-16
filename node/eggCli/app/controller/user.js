const {Controller} = require('egg');

class UserController extends Controller {
    async signup() {
        const user = this.ctx.request.body;
        try {
            const doc = await this.ctx.model.user.create(user);
            this.ctx.body = {
                code: 0,
                data: 'success'
            };
        }
        catch (e) {
            this.ctx.body = {
                code: 1,
                data: e
            };
        }

    }

    async signin() {

    }

    async signout() {

    }
}

module.exports = UserController;