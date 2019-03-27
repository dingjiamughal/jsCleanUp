class Application {
    constructor() {
        this.router = [{
            type: '*',
            method: '*',
            callback(req, res) {
                res.end(`Cannot ${req.method}  ${req.url}`);
            }
        }];
    }

    get() {}
}

module.exports = Application;
