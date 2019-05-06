const {SyncLoopHook} = require('tapable');

const queue = new SyncLoopHook(['name', 'age']);
let count = 3;

queue.tap('1', (name, age) => {
    console.log(name, count--);
    if (count) {
        return true;
    }
    return;
});

queue.call('dingjia');

// dingjia 3
// dingjia 2
// dingjia 1
