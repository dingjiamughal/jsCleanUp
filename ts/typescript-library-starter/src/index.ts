import {AxiosRequestConfig} from './types';
import {bulidURL} from './helpers/url';

import xhr from './xhr';

function axios(config: AxiosRequestConfig): void {
    const {url, params} = config;
    config.url = bulidURL(url, params);
    xhr(config);
}

// function processConfig (config: AxiosRequestConfig): void {

// }

// function transformUrl (config: AxiosRequestConfig): string {
//     const {url, params} = config
//     return bulidURL(url, params);
// }

export default axios;
