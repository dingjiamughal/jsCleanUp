const http = require('http');
const url = require('url');
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

    get(method, callback) {
        this.routers.push({
            type: 'get',
            method,
            callback
        });
    }

    listen() {
        const server = http.createServer((req, res) => {
            const {pathname} = url.parse(req.url, true);
            console.log(this.routers);
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

        server.listen.apply(server, arguments);
    }
}

module.exports = Application;
