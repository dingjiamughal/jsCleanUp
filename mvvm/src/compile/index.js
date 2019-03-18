import compileMap from './compileMap';
import {isDirective, isElement} from '../utils';

export default class Compile {
    constructor(el, vm) {
        this.el = isElement(el) ? el : document.querySelector(el);
        this.vm = vm;

        if (!this.el) {
            console.error('不给el 没法compile！'); // eslint-disable-line no-console
            return;
        }

        const fragment = this.node2Fragment(this.el);

        this.compile(fragment);
        this.el.appendChild(fragment);
    }

    // 核心功能

    // template取出在文档流中编译完，返还给html
    // el 传递参数为外层container -> #app
    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        while (el.firstChild) {
            fragment.appendChild(el.firstChild);
        }
        return fragment;
    }

    compile(fragment) {
        // 深度遍历节点
        // 1. Ele 取出attr
        // 2. Text {{xxxx}}
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {
            if (isElement(node)) {
                this.compileElement(node);

                // 检查下，是否还有子节点也是element
                this.compile(node);
            }
            else {
                this.compileText(node);
            }
        });
    }

    // target: compile的核心方法，解析渲染

    // v-model="name", v-text="text"
    compileElement(node) {
        const attrs = node.attributes;
        [...attrs].forEach(attr => {
            if (isDirective(attr.name)) {
                const expression = attr.value;
                const key = attr.name.replace('v-', '');

                // 针对不同的type: model/text/html... 映射到不同的方法函数
                compileMap[key](node, this.vm, expression);
            }

        });
    }

    // {{xxxxx}}
    compileText(node) {
        const reg = /\{\{([^}]+)\}\}/g;
        const text = node.textContent;

        if (reg.test(text)) {
            compileMap.text(node, this.vm, text);
        }
    }
}
