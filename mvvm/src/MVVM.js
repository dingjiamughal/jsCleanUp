import Compile from './compile';
import {Observer} from './observer';

export default class Mvvm {
    constructor(cfg) {
        this.$el = cfg.el;
        this.$data = cfg.data;

        if (!this.$el) {
            console.error('不给el 没法compile！'); // eslint-disable-line no-console
            return;
        }

        // 1. el和data 页面初始化阶段 --> compile template
        new Compile(this.$el, this);

        // 2. 数据劫持
        /**
         * 每次访问obj，都能劫持，get - set
         */
        new Observer(this.$data);

        // 代理data this.$data.name --> this.name
        this.proxyData(this.$data);
    }

    proxyData(data) {
        Object.entries(data).forEach(([key, value]) => {
            Object.defineProperty(this, key, { // 改变this上的xxx <=> @param的data === this.$data
                get() {
                    return value;
                },
                set(newVal) {
                    // data[key] = newVal;
                    value = newVal;
                }
            });
        });
    }
}
