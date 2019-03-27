const http = require('http');
const url = require('url');

module.exports = () => {
    const operations = [];
    const paramHandlers = {};
    const app = (req, res) => {
        const {pathname} = url.parse(req.url, true);
        let index = 0;

        function next(err) {
            if (index >= operations.length) {
                return res.end(`cannot found ${req.method}${pathname}`);
            }

            let op = operations[index++];
            const {
                type,
                method,
                callback
            } = op;

            if (err) {
                // err出现表示下面所有东西都不执行了
                // 所以目标是：只执行错误处理中间件
                // 先找中间件，如果不是中间件 next对象中找
                if (type === 'middleware') {
                    if (pathname === '/' || pathname.startsWith(method) || pathname === method) {
                        // 错误处理
                        if (callback.length === 4) {
                            callback(err, req, res, next);
                        }
                        // 所有的都匹配上了，但不是错误中间件的格式（args.length === 4）代表不是错误中间件，继续执行next
                        else {
                            next();
                        }
                    }
                    // 是中间件，但路径不匹配，next
                    else {
                        next(err);
                    }
                }
                // 如果不是middleware，就找next，直到是中间件，把err传给错误中间件
                else {
                    next(err);
                }
            }
            else {
                if (type === 'middleware') {
                    // middleware method的匹配条件，只要前缀一样就行
                    if (pathname === '/' || pathname.startsWith(method) || pathname === method) {
                        callback(req, res, next);
                    }
                    else {
                        next();
                    }
                }
                else {
                    // 动态路由的情况
                    if (op.params) { // ['name', 'age']
                        const matchers = pathname.match(method); // ['a/b/c/d', 'a', 'b', 'c', 'd']
                        if (matchers) {
                            req.params = op.params.reduce((memo, next, index) => {
                                memo[next] = matchers[index + 1];
                                return memo;
                            }, {});

                            op.params.forEach(param => {
                                const handler = paramHandlers[param];
                                if (handler) {
                                    return callback(req, res, () => callback(req, res), req.params.param);
                                }

                            });
                        // callback(req, res);
                        }
                        else {
                            next();
                        }
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
            }
        }
        next();
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

            // 判断method中是不是有占位符  /a/:b/c/:d
            const isIncludeColon = method.includes(':');
            if (isIncludeColon) {
                let params = [];
                method = method.replace(/:([^\/]+)/g, (...args) => {
                    params.push(args[1]);
                    return '([^\/]+)';
                });
                layer.method = new RegExp(method);
                layer.params = params;
            }

            operations.push(layer);
            // console.log(operations);
            // console.log('-----------');
        };
    });

    app.all = (method, callback) => {
        const layer = {
            type: 'all',
            method,
            callback
        };
        operations.push(layer);
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
        operations.push(layer);
    };

    // 绑定param 在req.params赋值时执行
    app.param = (key, callback) => {
        paramHandlers.key = callback;
    };

    // 内置中间件，做一层代理
    app.use((req, res, next) => {
        const urlObj = url.parse(req.url, true);
        req.path = urlObj.pathname;
        req.query = urlObj.query;
        req.hostname = req.headers.host.split(':')[0];
        next();
    });

    app.listen = (...args) => {
        let server = http.createServer(app);
        server.listen(...args);
    };

    return app;
};
