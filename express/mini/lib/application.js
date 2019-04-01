const http = require('http');
const url = require('url');
const Router = './router';
class Application {
    constructor() {
        this.routers = [{
            type: '*',
            method: '*',
            callback(req, res) {
                res.end(`Cannot ${req.method}  ${req.url}`);
            }
        }];
    }

    lazyrouter() {
        if (!this._router) {
            this._router = new Router();
        }
    }

    get(method, callback) {
        this.routers.push({
            type: 'get',
            method,
            callback
        });
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            const {pathname} = url.parse(req.url, true);

            this.routers.forEach(router => {
                const {
                    type,
                    method,
                    callback
                } = router;

                if (pathname === method && req.method.toLowerCase() === type) {
                    return callback(req, res);
                }

            });
            this.routers[0].callback(req, res);
        });

        server.listen(...args);
    }
}

module.exports = Application;
