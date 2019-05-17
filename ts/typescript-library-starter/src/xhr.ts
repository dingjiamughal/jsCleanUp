import {AxiosRequestConfig, AxiosResponse, AxiosPromise} from './types';
import {parseHeaders} from './helpers/header';
import {transformResponse} from './helpers/data';
import {createError} from './helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data, url, method = 'get', headers, responseType, timeout} = config;

        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        if (timeout) {
            request.timeout = timeout;
        }

        // open
        request.open(method.toUpperCase(), url, true);

        // onreadystatechange
        // 要把一些信息暴露出去
        request.onreadystatechange = function () {
            if (request.readyState !== 4 || request.status === 0) {
                return;
            }
            // console.log(request);
            // request.getAllResponseHeaders() 获取的headers是字符串 要转成object
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
            const response: AxiosResponse = {
                data: transformResponse(responseData),
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            // resolve(response);
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                reject(createError(`Request failed with status code ${response.status}`, config, null,  request, response));
            }
        }

        request.onerror = function () {
            reject(createError('Network Error', config, null, request));
        }

        request.ontimeout = function () {
            reject(createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request));
        }

        // 设置headers
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') { // 没有data的时候不需要headers
                delete headers[name];
            }
            else {
                request.setRequestHeader(name, headers[name]);
            }
        });

        // send
        request.send(data);
    });
}
