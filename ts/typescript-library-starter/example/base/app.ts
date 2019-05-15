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
