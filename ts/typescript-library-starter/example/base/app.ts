import axios from '../../src/index';

axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: 1,
        b: 2
    }
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
    data: {
        a: 1,
        b: 2
    }
});

// const arr = new Int32Array([21, 31])

// axios({
//     method: 'post',
//     url: '/base/buffer',
//     data: arr
// });