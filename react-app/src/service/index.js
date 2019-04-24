/**
 * @file axios.js
 * @author: dingjia
 * */

import axios from 'axios';

const baseURL = 'http://127.0.0.1:7001/';
const config = {
    baseURL,
    timeout: 8000,
    withCredentials: true // 跨域请求来的时候带cookie
};

export default function http(method = 'post', url, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            ...config,
            method,
            url,
            data
        }).then(res => {
            resolve(res.data);
        });
    });
}
