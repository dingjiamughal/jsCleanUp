# koa源码解读

koa基本用法
```js
const koa = require('koa');

const app = new Koa();
app.use((ctx, next) => {
    console.log(ctx.path);
    next();
});
app.use...
app.use...
app.listen(3000, () => {....})
```

package.json --> "main": "lib/application.js"，发现主入口application.js

export class Application 继承 Emiter（events模块）

koa实例化后的`app`对象调用`listen`方法，等同于原生 http.createServer(app.callback()).listen(...);

## 查看callback()

```js
const fn = compose(this.middleware);
const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
};

return handleRequest;
```
这个形如原生的createServer中的回调函数，koa中运行这段：this.handleRequest(this.createContext(req, res), compose(this.middleware)) <br>
每当发起一个请求，就创建一个context

## this.handleRequest

```js
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

ctx: this.createContext(req, res) <br>
fnMiddleware: compose(this.middleware) <br>

app.listen()执行，即执行了handleRequest方法，ctx是koa上下对象，fnMiddleware是总的中间件<br>
respond(ctx)是一个请求的结束之前的操作
方法返回

### this.createContext
传递node原生req和res，返回koa上下文对象context
```js
createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req; // 证明 ctx.req === ctx.request.req === node原生req
    context.res = request.res = response.res = res; // 同上
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
}
```

这里出现了this.context/request/response三个变量，在constructor中实例化就会生成。<br>
这是余下三个js文件export的东西，初步一看，context.js中对象里放了n个方法，request.js和response.js中一堆get和set，他们都继承了入口文件，`this.context = Object.create(context)`，最终context.js文件中的this下属性和方法，都可以在createContext方法中取到，为了取到所以拼命赋值给此namespace下的变量。<br>
context.js 下的delegate作用是将koa方法request/response代理到上下文，比如ctx.path方法执行 ===> request.js中的原生parse(this.req).pathname
最终返回的是个koa上下文对象。koa做了一件事：把所有的req和res都放在了context一个参数上，上面就是这个过程。

### node-delegate
`node-delegate`把内部属性暴露到外层对象，源码分析https://juejin.im/post/5b9339136fb9a05d3634ba13
在三个js文件大量使用了delegate把koa的方法代理到上下文上，比如ctx.request.xxx === ctx.xxx，用法：
```js
const delegate = require('delegate');
delegate(proto, 'context').method('attachment');

相当于 proto.context.attachment === proto.attachment
```
method代理方法，access代理setter + getter

### use
koa中间件，由于compose函数参数是`this.middleware`，所以在看compose之前先瞄准use，创建中间件的过程是添加middleware数组的过程。
```js
use(fn) {
    if (typeof fn !== 'function') {
        throw new TypeError('middleware must be a function!');
    }

    if (isGeneratorFunction(fn)) {
        deprecate('Support for generators will be removed in v3. ' +
            'See the documentation for examples of how to convert old middleware ' +
            'https://github.com/koajs/koa/blob/master/docs/migration.md');
        fn = convert(fn);
    }

    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
}
```
主要是往middleware数组中添加use的回调函数。交给compose函数来执行它。

### compose 和 this.middleware
`compose`是`koa-compose`模块，把多个koa中间件合并成一个大中间件。
```js
// 删减版的compose函数
function compose (middleware) {
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
现在已知middleware是一个回调函数集的数组，context是koa上下文对象，next为空。可以进一步简化compose函数。
```js
// 假设写了中间件，middleware数组不是空的
function compose (middleware) {
  return function (context) {
    return function dispatch(i) {
      return Promise.resolve(middleware[0](context, dispatch.bind(null, i + 1)));
    }
  }
}
```
上面还原第一个中间件执行过程，仿佛看到了`app.use((ctx, next) => {...})`的影子，此时next函数就被填充了