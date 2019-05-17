import axios from '../../src/axios';

axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(JSON.parse(res.data));
});

axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: ['foo', 'bar'],
        b: 'bbb',
        c: {
            haha: 'hehe'
        }
    }
});

axios({
    method: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    },
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res);
});

const arr = new Int32Array([21, 31]);

axios({
    method: 'post',
    url: '/base/buffer',
    data: arr
});

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
});
