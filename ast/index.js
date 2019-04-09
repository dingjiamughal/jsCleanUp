const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const code = 'function ast() {}';
const ast = esprima.parse(code);
estraverse.traverse(ast, {
    enter(node) {
        if (node.type === 'Identifier') {
            node.name += '_enter';
        }
    },
    leave(node) {
        if (node.type === 'Identifier') {
            node.name += '_leave';
        }
    }
});

const result = escodegen.generate(ast);
console.log(result);
