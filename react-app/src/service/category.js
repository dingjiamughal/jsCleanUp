import ajax from './index';
import qs from 'qs';

export async function getList(query) {
    return await ajax('get', `/api/category?${qs.stringify(query)}`);
}
