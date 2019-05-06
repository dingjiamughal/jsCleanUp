const {SyncHook} = require('tapable');

const queue = new SyncHook(['name', 'age']);

queue.tap('1', name => {
    setTimeout(() => {console.log(1, name);}, 1000);
});
queue.tap('2', name => {
    setTimeout(() => {console.log(2, name);}, 2000);
});
queue.tap('3', name => {
    setTimeout(() => {console.log(3, name);}, 3000);
});
queue.call('dingjia');

// dingjia 1
// dingjia 2
// dingjia 3
