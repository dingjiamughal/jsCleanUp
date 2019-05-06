const {SyncWaterfallHook} = require('tapable');

const queue = new SyncWaterfallHook(['name', 'age']);

queue.tap('1', (name, age) => {
    console.log(name, 1);
    return 1;
});

queue.tap('2', data => {
    console.log(data, 2);
    return 2;
});

queue.tap('3', data => {
    console.log(data, 3);
});

queue.call('dingjia');

// dingjia 3
// 1 2
// 2 3
