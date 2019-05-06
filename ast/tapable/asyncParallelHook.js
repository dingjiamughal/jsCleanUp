const {AsyncParallelHook} = require('tapable');

const queue = new AsyncParallelHook(['name']);

console.time('cost');
// queue.tapAsync('1', (name, cb) => {
//     setTimeout(() => {console.log(1, name); cb();}, 1000);
// });
// queue.tapAsync('2', (name, cb) => {
//     setTimeout(() => {console.log(2, name); cb();}, 2000);
// });
// queue.tapAsync('3', (name, cb) => {
//     setTimeout(() => {console.log(3, name); cb();}, 3000);
// });

// queue.callAsync('dingjia', () => {
//     console.log('finish');
//     console.timeEnd('cost');
// });

queue.tapPromise('1', (name, cb) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {console.log(1, name); resolve();}, 1000);
    });
});
queue.tapPromise('2', (name, cb) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {console.log(2, name); resolve();}, 2000);
    });
});
queue.tapPromise('3', (name, cb) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {console.log(3, name); resolve();}, 3000);
    });
});

queue.promise('dingjia', () => {
    console.log('finish');
    console.timeEnd('cost'); // 3
});
