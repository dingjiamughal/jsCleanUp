const {SyncBailHook} = require('tapable');

const queue = new SyncBailHook(['name', 'age']);

queue.tap('1', (name, age) => {
    console.log(name, 1);
});

queue.tap('2', (name, age) => {
    console.log(name, 2);
    return 1;
});

queue.tap('3', (name, age) => {
    console.log(name, 3);
});

queue.call('dingjia');

// dingjia 1
// dingjia 2
