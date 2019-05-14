const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const {default: traverse} = require('@babel/traverse');

function handleEntry(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    const deps = {};

    traverse(ast, {
        ImportDeclaration({node}) {
            const chunkName = node.source.value;
            const dir = path.dirname(filename);
            const fullName = path.join(dir, chunkName) + '.js';
            deps[chunkName] = fullName;
        }
    });

    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });

    return {
        filename,
        deps,
        code
    };
}

function dependence(filename) {
    const chunks = [handleEntry(filename)];

    chunks.forEach(chunk => {
        const deps = chunk.deps;
        if (deps) {
            Object.entries(deps).forEach(([key, value]) => {
                chunks.push(handleEntry(value));
            });
        }
    });
    // console.log(chunks)
    const full = {};
    chunks.forEach(chunk => {
        full[chunk.filename] = {
            deps: chunk.deps,
            code: chunk.code
        };
    });

    return full;
}

function generatorCode(entry) {
    const graph = JSON.stringify(dependence(entry));
    return `
        (function(graph){
            function require(module) {
                function localRequire(localPath) {
                    return require(graph[module].deps[localPath]);
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            }

            require('${entry}');
        })(${graph});
    `;
}

console.log(generatorCode('../src/test.js'));
