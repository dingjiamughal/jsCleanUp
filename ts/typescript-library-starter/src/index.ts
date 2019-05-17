import {AxiosRequestConfig, AxiosPromise} from './types';
import {bulidURL} from './helpers/url';
import {transformRequest} from './helpers/data';
import {processHeaders} from './helpers/header';

import xhr from './xhr';

function axios(config: AxiosRequestConfig): AxiosPromise {
    const {url, params, headers = {}, data} = config;
    config.url = bulidURL(url, params);
    config.data = transformRequest(config);
    config.headers = processHeaders(headers, data);
    return xhr(config);
}

export * from './types';
export default axios;
