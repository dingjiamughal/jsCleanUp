import {createElement as h} from './render';

const vNode = h('ul', {
    class: 'list'
}, [
    h('li', {class: 'item'}, ['a']),
    h('li', {class: 'item'}, ['b']),
    h('li', {class: 'item'}, ['c'])
]);

console.log(vNode);
