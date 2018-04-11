## export语法

```js
// util1.js
export default {
  a:1
}

// util2.js
export function fn1(){
  console.log("f1")
}
export function fn2(){
  console.log("f2")
}
```

```js
import util1 from "./util1.js"
import {fn1,fn2} from "./util2.js"

console.log(util1)
fn1();
fn2();

[1,2,3].map(item => item + 2);
```
## babel开发环境
启动模块化的本地开发环境需要
* node环境
* 安装`babel-core` `babel-preset-es2015` `babel-preset-latest`
* 编写babel规则的`.babelrc`
* -g安装babel脚手架工具 `bebel-cli`

>直接输出结果运行 babel ./src/index.js

babel只能编译es6语法，对于模块化相互引用必须使用webpack来搭建开发环境

```js
// webpack.config.js---符合commonjs规范
module.exports = {
  entry:"./src/index.js",
  output:{
    path:"__dirname",
    filename:"./build/bundle.js"
  },
  module:{
    rules:[{
      test:/\.js?$/,
      exclude:/node_modules/,
      loader:"babel-loader"
    }]
  }
}
```
