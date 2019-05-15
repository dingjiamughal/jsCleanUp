import {isDate, isObject} from './util';

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

// params: {
//     foo: ['foo', 'bar'],
//     bar: {
//         foo: 'bar', bar: 'foo'
//     }
// }
export function bulidURL (url: string, params?: any): string {
    if (!params) {
        return url;
    }

    const parts: string[] = [];

    Object.keys(params).forEach(key => {
        const val = params[key];

        if (val === null || typeof val === 'undefined') {
            return;
        }

        let values: string[];

        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            values = [val];
        }

        values.forEach(val => {
            if (isDate(val)) {
                val = val.toISOString();
            }
            else if (isObject(val)) {
                val = JSON.stringify(val)
            }

            parts.push(`${encode(key)}=${encode(val)}`)
        });

    });

    const serializedParams = parts.join('&');

    if (serializedParams) {
        const markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            url = url.slice(0, markIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
}
