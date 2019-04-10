// 箭头函数转换
const babel = require('babel-core');
const types = require('babel-types');

const code = 'const sun = (a, b) => a + b';

// babel 先转换成ast，再进行遍历 => es5
const result = babel.transform(code, {
    plugins: [
        {
            visitor: {
                ArrowFunctionExpression(path) {
                    const params = path.node.params;
                    const body = types.blockStatement([
                        types.returnStatement(path.node.body)
                    ]);
                    const func = types.functionExpression(null, params, body, false, false);
                    path.replaceWith(func);
                }
            }
        }
    ]
});

console.log(result.code);
