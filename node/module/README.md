- namespace
- 闭包
- amd(require.js)
- cmd(sea.js)
- commonjs
- es module
- umd

```js
const xxx = require('xxx');
```

```js
// require函数的定义
function require(filename) {
    fs.readFileSync(filename, 'utf-8');
    return function (exports, require, module, __filename, __dirname) {
        let name = 'dingjia';
        let age = 24;
        module.exports = {name,age};
        return module.exports;
    }
}()
```

如果多次require，只会执行一次的原因：`require.cache`，每一次`require`就会cache一次，把文件绝对路径：`module.filename`push到cache队列中