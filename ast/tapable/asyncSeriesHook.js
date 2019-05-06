const {AsyncSeriesHook} = require('tapable');

const queue = new AsyncSeriesHook(['name']);

console.time('cost');
queue.tapAsync('1', (name, cb) => {
    setTimeout(() => {
        console.log(1, name);
        cb();
    }, 1000);
});

queue.tapAsync('2', (name, cb) => {
    setTimeout(() => {
        console.log(2, name);
        cb();
    }, 2000);
});

queue.tapAsync('3', (name, cb) => {
    setTimeout(() => {
        console.log(3, name);
        cb();
    }, 3000);
});

queue.callAsync('dingjia', () => {
    console.timeEnd('cost');
});

// 1 'dingjia'
// 2 'dingjia'
// 3 'dingjia'
// cost: 6071.158ms