import {Dep} from '../observer';

export default class Watcher {
    // watch('a.b.c') {}
    constructor(vm, expression, callback) {
        this.vm = vm;
        this.expression = expression;
        this.callback = callback;

        this.oldVal = this.get();
    }

    getVal(vm, expression) {
        const data = expression.split('.').reduce((memo, next) => (memo[next]), vm.$data);
        return data;
    }

    get() {
        Dep.target = this;
        const value = this.getVal(this.vm, this.expression);
        Dep.target = null;
        return value;
    }

    update() {
        const newVal = this.getVal(this.vm, this.expression);
        const oldVal = this.oldVal;

        if (newVal !== oldVal) {
            this.callback(newVal);
        }
    }
}
