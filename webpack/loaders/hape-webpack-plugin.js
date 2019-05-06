class Hape {
    constructor() {

    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('Hape', (compilation, callback) => {
            console.log(compilation.assets);
        });
    }
}

module.exports = Hape;
