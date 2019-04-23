const BaseController = require('./base');

class UserController extends BaseController {
    async signup() {
        const user = this.ctx.request.body;
        // const user = {
        //     username: 'djmughal',
        //     email: '4655@qq.com',
        //     password: 'hahahaha'
        // };

        try {
            const doc = await this.ctx.model.User.create(user);
            this.success('注册成功');
        }
        catch (e) {
            this.fail(e);
        }

    }

    async signin() {
        let user = this.ctx.request.body;

        try {
            user = await this.ctx.model.User.findOne(user);
            if (user) {
                this.ctx.session.user = user;
                this.success(user);
            }
            else {
                this.fail('用户名或密码错误');
            }
        }
        catch (e) {
            this.fail(e);
        }
    }

    async signout() {
        this.ctx.session.user = null;
        this.success('退出成功');
    }
}

module.exports = UserController;
