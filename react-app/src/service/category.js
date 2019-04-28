import ajax from './index';
import qs from 'qs';

export async function getList({current = 1, pageSize = 5}) {
    return await ajax('get', `/api/category?pageNum=${current}&pageSize=${pageSize}`);
}

export async function create(query) {
    return await ajax('post', '/api/category', query);
}
