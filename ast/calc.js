const babel = require('babel-core');
const types = require('babel-types');

const code = 'const result = 1000 * 60';

const visitor = {
    BinaryExpression(path) {
        const node = path.node;
        if (isNaN(node.left.value) && isNaN(node.right.value)) {
            let result = eval(node.left.value + node.operator + node.right.value);
            result = types.numericLiteral(result);
            path.replaceWith(result);
        }

    }
};

const result = babel.transform(code, {
    plugins: [
        {
            visitor
        }
    ]
});
console.log(result.code);
