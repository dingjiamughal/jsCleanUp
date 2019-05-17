import axios, {AxiosError} from '../../src/axios';

axios({
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res);
}).catch((e) => {
    console.log('error:', e);
});

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res);
}).catch((e: AxiosError) => {
    console.log(e.message);
    console.log(e.request);
    console.log(e.code);
    console.log(e)
});
