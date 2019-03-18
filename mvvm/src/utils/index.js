export function isElement(node) {
    return node.nodeType === 1;
}

export function isDirective(key) {
    return key.includes('v-');
}

export function isObject(target) {
    return target && typeof target === 'object';
}
