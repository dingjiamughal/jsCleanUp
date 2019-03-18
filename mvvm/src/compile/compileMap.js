import Watcher from '../watcher';

class CompileMap {
    constructor() {
        this.render = {
            updateModel(node, value) {
                node.value = value;
            },
            updateText(node, value) {
                node.textContent = value;
            }
        };
    }

    // template中的表达式：name.a.b.c 得到vm中的data对应值
    getVal(vm, expression) {
        const data = expression.split('.').reduce((memo, next) => (memo[next]), vm.$data);
        return data;
    }

    // 当人为改变input值，vm,.data 要跟着变触发watcher
    setVal(vm, expression, newVal) {
        expression.split('.').reduce((memo, next, index) => {
            if (index === expression.length - 1) {
                return memo[next] = newVal;
            }

            return memo[next];
        }, vm.$data);
    }

    model(node, vm, expression) {
        const updateFn = this.render.updateModel;

        // compile时，input从null -> 有值 触发watch
        new Watcher(vm, expression, newVal => {
            updateFn && updateFn(node, this.getVal(vm, expression));
        });

        node.addEventListener('input', e => {
            const newVal = e.target.value;
            this.setVal(vm, expression, newVal);
        });

        updateFn && updateFn(node, this.getVal(vm, expression));
    }

    text(node, vm, value) {
        const updateFn = this.render.updateText;

        // value复杂情况：{{name}} --- {{sex}} 6666

        // =*=*=*=*=*=*=*=*=*=*= 爪巴o0o0o0o0 =*=*=*=*=*=*=*=*=*=*=
        value.split('}}')
            .filter(item => !!~item.indexOf('{{'))
            .map(item => item.slice(item.indexOf('{{') + 2))
            .forEach(expression => {
                value = value.replace(`{{${expression}}}`, this.getVal(vm, expression));
                new Watcher(vm, expression, newVal => {
                    value = value.replace(`{{${expression}}}`, this.getVal(vm, expression));
                    // updateFn && updateFn(node, value);
                });
            });
        updateFn && updateFn(node, value);
    }
}

export default new CompileMap();
