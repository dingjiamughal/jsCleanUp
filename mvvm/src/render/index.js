export function createElement(node, props, children) {
    return new Element(node, props, children);
}

class Element {
    constructor(node, props, children) {
        this.node = node;
        this.props = props;
        this.children = children;
        
        this.render(this);
    }

    setAttr(node, propName, value) {
        switch (propName) {
            case 'value':
                const tagName = node.tagName.toLowerCase();
                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value;
                }
                else {
                    node.setAttribute(propName, value);
                }
            case 'style':
                node.style.cssText = value;
            default:
                node.setAttribute(propName, value);
                break;
        }
    }

    render(eleObj) {
        let el = document.createElement(eleObj.node);
        
        Object.entries(eleObj.props).forEach(([prop, value]) => {
            this.setAttr(el, prop, value);
        });
        eleObj.children.forEach(child => {
            let childContent = '';
            if (child instanceof Element) {
                childContent = this.render(child);
            }
            else {
                childContent = document.createTextNode(child)
            }
            el.appendChild(childContent);
        });

        return el;
    }

}
