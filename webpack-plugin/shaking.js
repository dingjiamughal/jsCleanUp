const babel = require('@babel/core');
const types = require('@babel/types');

const visitor = {
    ImportDeclaration(path) {
        const node = path.node;
        const specifiers = node.specifiers;
        // 原先的specifiers ImportSpecifier对象替换成想要的ImportDefaultSpecifier
        // astplore.net + babel-types文档 会明朗的
        if (!types.isImportDefaultSpecifier(specifiers[0])) { // === specifiers[0].type === 'ImportDefaultSpecifier'
            const newSyntax = specifiers.map(sp => {
                return types.importDeclaration(
                    [types.importDefaultSpecifier(sp.local)],
                    types.stringLiteral(`${node.source.value}/${sp.local.name}`)
                );
            });
            path.replaceWithMultiple(newSyntax);
        }
    }
};

const code = 'import {flatten, join} from "lodash";';
const result = babel.transform(code, {
    plugins: [
        {
            visitor
        }
    ]
});

console.log(result.code);
