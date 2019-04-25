/**
 * @file 用户登录注册
 * @author: dingjia
 * */

import ajax from './index';

export async function signin(user) {
    return await ajax('post', '/api/user/signin', user);
}

export async function signup(user) {
    return await ajax('post', '/api/user/signup', user);
}

export async function signout() {
    return await ajax('post', '/api/user/signout');
}
