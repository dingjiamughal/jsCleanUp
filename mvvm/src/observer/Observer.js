import Dep from './Dep';
import {isObject} from '../utils';

export default class Observer {
    constructor(data) {
        this.observer(data);
    }

    observer(data) {
        if (!isObject(data)) {
            console.log('data不是object，8用劫持');
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            this.defineReactive(data, key, value);
            this.observer(value); // 深度劫持
        });
    }

    defineReactive(data, key, value) {
        const self = this;
        const dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 首次compile时，没有Dep，Dep.target区分
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newVal) {
                if (newVal !== value) {
                    // name: 1 ---> name: {a: 1} 新对象劫持
                    self.observer(newVal);
                    value = newVal;
                    dep.notify();
                }

            }
        });
    }
}
