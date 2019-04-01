const Layer = require('./layer');
const Route = require('./route');

class Router {
    constructor() {
        this.stack = [];
    }

    route(path) {
        const route = new Route(path);
        const layer = new Layer(path, route.dispatch.bind(route));

        layer.route = route;
        this.stack.push(layer);
        return route;
    }
}
