// todo: webapck打包工具

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const {default: traverse} = require('@babel/traverse');

// 分析入口文件
function moduleAnalyser(filename) {
    const content = fs.readFileSync(filename, 'utf-8'); // 把入口文件代码读出来
    const ast = parser.parse(content, { // ast
        sourceType: 'module'
    });
    const deps = {};

    // 需要在ast中找到我所需要的文件路径（import）
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename);
            const newFile = path.join(dirname, node.source.value) + '.js';
            deps[node.source.value] = newFile;
        }
    });
    // console.log(deps);

    // 转换入口代码。为浏览器可运行代码
    const {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    });
    // console.log(code);
    // {
    //     filename: '../src/test.js',
    //     deps: {'./m1': '\\..\\src\\m1', './m2': '\\..\\src\\m2'},
    //     code: 'xxx'
    // }
    return {
        filename,
        deps,
        code
    };
}

function makeDependenciesGraph(entry) {
    const entryModule = moduleAnalyser(entry);
    const graphArr = [entryModule];

    graphArr.forEach(graph => {
        const {deps} = graph;
        if (deps) {
            Object.entries(deps).forEach(([key, value]) => {
                graphArr.push(moduleAnalyser(value));
            });
        }
    });

    const graph = {};
    graphArr.forEach(item => {
        graph[item.filename] = {
            deps: item.deps,
            code: item.code
        };
    });
    return graph;
}

function generateCode(entry) {
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    // console.log(graph)
    return `
        (function(graph){
            function require(module) {
                function localRequire(relativePath){
                    // ./m1.js
                    return require(graph[module].deps[relativePath]);
                }
                var exports = {};
                (function (require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            };
            require('${entry}')
        })(${graph});
    `;
}

const code = generateCode('../src/test.js');
console.log(code);
// makeDependenciesGraph('../src/test.js');
// console.log(moduleAnalyser('../src/test.js'));
