const http = require('http');
const path = require('path');
const url = require('url');
module.exports = () => {
    const operation = [];
    const app = (req, res) => {
        const {pathname} = url.parse(req.url, true);
        let index = 0;
        function next() {
            let op = operation[index];
            if (op.method === 'middleware') {
            }
            else {
                if ((pathname === method || method === '*')
                    && (type === req.method.toLowerCase() || type === 'all')) {
                    return callback(req, res);
                }
                else {
                    next();
                }
            }
        }
        next();
        operation.forEach(({
                type,
                method,
                callback
            }) => {

            if (type === 'middleware') {
            }
            else if ((pathname === method || method === '*')
                && (type === req.method.toLowerCase() || type === 'all')) {
                return callback(req, res);
            }

        });
        res.end(`cannot found ${req.method}${pathname}`);
    };

    // app.listen = () => {
    //     let server = http.createServer(app);
    //     server.listen.apply(server, arguments);
    // };

    http.METHODS.forEach(type => {
        type = type.toLowerCase();
        app[type] = (method, callback) => {
            const layer = {
                type,
                method,
                callback
            };
            operation.push(layer);
        };
    });

    app.all = (method, callback) => {
        const layer = {
            type: 'all',
            method,
            callback
        };
        operation.push(layer);
    };

    app.use = (method, callback) => {

        // 只有一个参数 function
        if (typeof method === 'function') {
            callback = method;
            method = '/';
        }

        const layer = {
            type: 'middleware',
            method,
            callback
        };
        operation.push(layer);
    };

    app.listen = (...args) => {
        let server = http.createServer(app);
        server.listen(...args);
    };
    return app;
};
