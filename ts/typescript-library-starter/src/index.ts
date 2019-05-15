import {AxiosRequestConfig} from './types';
import {bulidURL} from './helpers/url';
import {transformRequest} from './helpers/data';

import xhr from './xhr';

function axios(config: AxiosRequestConfig): void {
    const {url, params} = config;
    config.url = bulidURL(url, params);
    config.data = transformRequest(config);
    xhr(config);
}

export default axios;
