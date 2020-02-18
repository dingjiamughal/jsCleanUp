const Promise2 = require('./promise');

// const p = new Promise2((resolve, reject) => {
//     resolve('dingjia');
//     reject('error !')
// });

const p = new Promise2((resolve, reject) => {
    resolve('123');
});
p.then(
    res => {
        console.log('res', res);
    },
    err => {
        console.log('err', err);
    }
);

console.log(1);

console.log(p);
