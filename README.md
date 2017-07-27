# jsCleanUp

一、变量的类型和计算
二、js三座大山——原型、作用域、异步
三、webapi：DOM 操作，BOM 操作，事件绑定，ajax 和 存储
四、开发环境：IDE，Git，模块化，打包工具，上线流程
五、运行环境：页面加载和渲染，性能优化，安全性

<!-- more -->

# 一、变量的类型和计算
## 1.值类型和引用类型
值类型：
```js
var a=10; var b=a;
console.log("a",a);//10
console.log("b",b);//10
```

引用类型：
```js
var obj1={
  a:10,
  b:20
}
var obj2=obj1;
obj2.a=15;
console.log("obj1",obj1)//{a:15,b:20}
```

值类型的赋值过程不影响被赋值的对象，而引用类型因为为了让内存占用空间小，所以指针指向同一目标，所以会互相影响。

## 2.typeof
typeof只能识别值类型，无法识别引用类型
值类型为 `undefined` `boolen` `number` `string`
引用类型 `{}` `[]` `null` `console.log`，前三者用typeof识别返回object，console返回值为Function。

## 3.变量计算和强制类型转换

- 字符串拼接
- ==运算符
- if判断
- 逻辑运算
```js
    100 + "10" = "10010"
    undefined == null  双等号会进行强制类型转换
    10 && 0 = 0
    '' && 10 = 10  

    var a=100;
    console.log(!!a); //true

    if(param==undefined)//等同于param==null 别的情况都用`===`
```
## 4.内置函数
js内置函数为：`Date` `Object` `Boolen` `String` `Array` `Number` `RegExp` `Function` `Error`
js内置对象为：`JSON` `Math`
内置对象：
```
JSON.stringfy({a:1});// json to str "{"a":1}"
JSON.parse("{"a":1}");// str to string {a:1}
```

# 二、三座大山——原型、作用域、异步
## 1.原型和原型链

### 构造函数：
```js
function Fn(){
  this.name="dingjia";
  this.age=23;
  this.getName=function(){
    console.log("name="+this.name)
  }
  // return this
}
```
### 构造函数扩展：
```js
js构造函数语法糖
var obj={}<=>var obj=new Object();
var arr=[]<=>var arr=new Array();
var foo=function(){}<=>var foo=new Function();
```
用instanceof判断是否是变量的构造函数
```js
var arr=[1,2,3]
arr instanceof Array;//true
arr instanceof Object;//true
```

### prototype：
```js
var obj={}
obj.a=20----->(如果对象中没有a)obj.__proto__.a----->Object.prototpe.a  
```
所有引用类型（对象，数组，函数）的__proto__的属性值，都指向其构造函数的prototype
```js
var f=new Foo();
f.a----->(没有a)----->Foo.prototype.a----->(没有a)----->Foo.prototype.__proto__.a<=>Object.prototype.a
Foo.prototype.__proto__----->Object.prototype
```
判断是否是对象上自带的属性：
```js
f.hasOwnProperty("xxx")
```

### 原型链继承
```js
function Animal(){
  this.eat=function(){
    console.log("all can eat")
  }
}
function Dog(){
  this.bark=function(){
    console.log("dog bark")
  }
}

Dog.prototype=new Animal();
var piggy=new Animal();

Dot.eat----->Dog.prototype.eat----->new Animal().eat
```

## 作用域
先抛出几个问题
- 什么是变量提升
- this的不同场景
- div点击显示下标
- 作用域的判别
- 什么是闭包，在实际开发中的应用

### 1.变量提升
```js
console.log(aaa);      //undefined
var aaa = {"a": 1};

abc();                 //1
function abc() {
  console.log(1)
}

func();
var func = function() {// not a function
  console.log(2)
}
```
当变量是值类型的时候，函数声明必须在调用之前。但如果是函数类型时，会提升变量。

## this
### this在函数执行时被确定
```js
var a={
  "name":"dingjia",
  fn:function(){
    console.log(this.name)
  }
}
```
1.a.fn(); //dingjia
2.a.fn.call({"name":"dj"})//dj
3.var a1=a.fn;a1();//this===window 运行时a1中的函数在全局

>如何改变this的指向？

```js
var f=function(name,age){
  console.log(this)
}.bind({"x":200})//this----->x

function fn(){
  console.log(this)
}
fn.call({"x":200}."dingjia",23) //this----->x
```

### 闭包
闭包应用的两种情况——函数作为返回值，函数作为参数传递。
```js
// 第一种情况函数作为返回值
function foo(){
  var max=100;
  return function bar(x){
    if(x<max){
      console.log(x)  
    }
  }
}
var f=foo();
f(15);
```
```js
// 函数作为传递参数
var max=100;
var fn=function(x){
  if(x<max){
    console.log(x)
  }
}
(function(f){
  var max=500;
  f(15)
})(fn)
```

### 闭包在实际开发中的运用（封装变量、收敛权限）
闭包的好处就在于封装变量和收敛权限，什么意思呢，比如我们需要往一个数组中不断添加值的时候，通常会定义一个全局变量arr，这将很可能导致命名冲突。
```js
function isFirst(){
  var list=[];
  return function(id){
    if(list.indexOf(id)>=0){
      return false;
    }else {
      list.push(id);
      return true
    }
  }
}
var first=isFirst();
first(10);//true
first(10);//false
first(15);//true
```
```js
// 这是闭包中最常见的例子
var box=document.getElementByClassName("box");
// 用es6的let声明变量收敛权限
for (let i = 0; i < box.length; i++) {
    box[i].onclick=function(){
      console.log(i)
    }
}
// 闭包方式的执行上下文
for (var i = 0; i < box.length; i++) {
  (function(n){
    box[i].onclick=function(){
      console.log(n);
    }
  })(i)
}
```

## 异步和单线程
```js
console.log(1);
setTimeout(function(){
  console.log(2)
});
console.log(3);
setTimeout(function(){
  console.log(4);
},1000);
console.log(5);
```
执行结果为1 3 5 2 4

### 异步操作的运用场景
- setTimeout和setInterval
- ajax、img.onload
- 事件，addEventLister

### 内置对象的方法
```js
Date.now();//获取当前时间的毫秒数
var date=new Date();
date.getTime();//获取毫秒数
date.getFullYear()
date.getMonth()// 0-11月
date.getDate()// 0-31日
date.getHours()//0-23 小时
date.getMinutes()// 0-59 分钟
date.getSeconds()// 0-59 秒
```
```js
// 截取十位数
var random = Math.random();
random = random+'0000000000';
random = random.slice(0,10);
```

# 三、webapi
## BOM
BOM中的知识点就两个：检测浏览器类型，拆解url的各部分`navigator` `screen` `location` `history`，这四种api的用法
```js
//浏览器类型的判别
var ua = navigator.userAgent;
    ua.indexOf("chrome")
```
```js
location:
href----->https://github.com/dingjiamughal/h5-group/blob/master/jumpBox
protocol----->http:/https:
pathname----->域名----->"/dingjiamughal/h5-group/blob/master/jumpBox"
search----->参数
hash----->#

history：
history.back()----->后退
history.forward()----->前进
```

## DOM操作
- 新增节点
- 获取父元素
- 获取子元素
- 删除元素
- 插入节点
```js
// 新增节点
var node=document.createElement("elem");
container.appendChild(node);
// 获取父元素
div.parentNode.nodeName;
// 获取子元素
div.childNodes.nodeName;----->#text也是节点----->div.childNodes.nodeType==3
// 删除元素
div.removeChild(node);
// 插入节点（本质交换位置）
<ul id="myList">
  <li>Coffee</li>
  <li>Tea</li>
</ul>
// insertBefore原有节点之间，交换位置，新节点插入到之前
var list=document.getElementById("myList")
list.insertBefore(list.childNodes[1],list.childNodes[0]);
// 插入新节点
var newItem=document.createElement("LI")
var textnode=document.createTextNode("Water")
newItem.appendChild(textnode)
var list=document.getElementById("myList")
list.insertBefore(newItem,list.childNodes[0]);
```

## ajax
### 手写ajax：
```js
var xmlhttp = null; //声明一个变量，用来实例化XMLHttpRequest对象
if (window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest(); // 新版本的浏览器可以直接创建XMLHttpRequest对象
} else if (window.ActiveXObject) {
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE5或IE6没有XMLHttpRequest对象，而是用ActiveXObject对象
}
if (xmlhttp != null) {
  xmlhttp.onreadystatechange = state_Change; //指定响应函数为state_Change
  xmlhttp.open("GET", "/example/xdom/note.xml", true); //指定请求，这里要访问在/example/xdom路径下的note.xml文件，true代表的使用的是异步请求
  xmlhttp.send(null); //发送请求
} else {
  alert("Your browser does not support XMLHTTP.");
}

//创建具体的响应函数state_Change
function state_Change() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // 这里应该是函数具体的逻辑
  } else {
      alert("Problem retrieving XML data");
    }
  }
}
```

### Promise
```js
// Promise
{
  // 基本定义
  let ajax = function(callback) {
    console.log('执行');
    setTimeout(function() {
      callback && callback.call()
    }, 1000);
  };
  ajax(function() {
    console.log('timeout1');
  })
}
//利用promise的then方法避免回调地狱，resolve和reject分别对应了then和catch
{
  let ajax = function(num) {
    console.log('执行4');
    return new Promise(function(resolve, reject) {
      if (num > 5) {
        resolve()
      } else {
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function() {
    console.log('log', 6);
  }).catch(function(err) {
    console.log('catch', err);
  });
}
```

## 跨域
跨域条件：协议、域名、端口号
可跨域的标签：`img` `script` `link`
跨域的解决方案：`jsonp` `http header`

## 事件绑定

### 阻止事件冒泡
>e.stopPropagation()

### 阻止默认行为
>e.preventDefault()

### 事件绑定函数
```js
function bindEvent(elem,type,selector,fn){
  if(fn==null){
    fn=selector;
    selector=null;
  }
  elem.addEventLister(type,function(e){
    var target;
    if(selector){
      target=e.target;
      if(target.matches(selector){
        fn.call(target,e)
      })else{
        fn(e)
      }
    }
  })
}
```

### 事件代理
```js
div.addEventLister("click",function(){
  e.target...
  })
```

## 存储
存储的三种形式：`cookie` `sessionStorage` `localStorage`
cookie:
cookie本身用于客户端和服务器端之间的通信，存储量小只有4K，并且所有http请求都会带着cookie影响获取资源效率。
web storage:
sessionStorage和localstorage都属于web storage。区别在于：
localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。
sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
用法一致，api为：
```js
sessionStorage.setItem("key", "value");
var value = sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear();
```

# 四、开发环境
## IDE
`subline` `vscode` `atom`
atom插件:http://www.xhrsama.com/editor/atom/

## git
```js
git clone "仓库地址"
git status -----> 查看修改文件
git add .  -----> 添加新文件至本地仓库
git commit --amend -----> 取消操作
git commit -m "xxx" -----> 备注
git push -u origin master -----> 上传到线上master分支
```

## 模块化
requirejs
```js
// util.js
defined(function(){
  return {
    method1:function(){
      ...
    }
  }
})
// a-util.js
defined(['./util.js'],function(a){
  return {
    method2:function(){
      ...
    }  
  }
})
// a.js
defined(['./a-util.js'],function(a){
  return {
    method2:function(){
      ...
    }  
  }
})
```

commonjs符合nodejs规范，并且用npm下载包和插件
```js
// util.js
var util={
  method1:function(){
    ...
  }
}
module.exports=util;
// a-util.js
var util=require("./util.js");
console.log(util.method1);
```

## 打包工具gulp、webpack

### gulp配置：http://www.xhrsama.com/others/gulp/

### webpack的配置
1.js文件打包
```js
entry: {//入口文件
  'index': ['./src/js/index/index.js'],
  'common': ['./src/js/common.js', 'webpack-dev-server/client?http://localhost:8080/'],
},
output: {//打包输出
  path: path.resolve(__dirname, 'dist'),  //输出根目录 此后所有的打包输出路径都在dist目录
  publicPath: '/',
  filename: 'js/[name].[chunkhash].bundle.js'//chunkhash 模块加密 name 对应文件名称
}
```
2.编译html `html-webpack-plugin`
```js
var getHtml = function(page) {
  return {
    title: page,
    template: './src/view/' + page + '/index.html',
    filename: 'view/' + page + '/index.html',
    inject: true,
    hash: true,
    chunks: ['common', page]
  }
}
```
3.单独打包css `extract-text-webpack-plugin`
```js
new ExtractTextPlugin({
  filename: 'css/[name]/[name]-[hash:7].css',
  disable: false,
  allChunks: true
}),
```
### module.rules.use
4.css/less/sass加载器
```js
{
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
  })
}, {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'less-loader']
  })
}
```
5.图片解析
```js
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,//大于limit用base64格式
      name: 'images/[name].[hash:7].[ext]'
    }
  }
}
```
6.解析html中的图片 `html-withimg-loader`
```js
{
  test: /\.(htm|html)$/i,
  use: {
    loader: 'html-withimg-loader'
  }
}
```
7.特殊字体的打包
```js
{
  test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
  use: {
    loader: 'file-loader',
    options: {
      limit: 50000,
      name: "fonts/[name].[ext]"
    }
  }
}
```
8.编译es6 babel-loader
```js
{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }
}
```
9.自动加载模块，如jQuery，vue
```js
new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery"
})
```
10.独立打包通用模块
```js
//独立通用模块打包到js/base.js
new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/base.js'//打包路径
})
```

# 五、运行环境
## 页面加载和渲染过程(window.onload和DOMContentLoaded区别)
1.解析HTML结构。
2.加载外部脚本和样式表文件。
3.解析并执行脚本代码。
4.DOM树构建完成。//DOMContentLoaded
5.加载图片等外部文件。
6.页面加载完毕。//window.onload

## 性能优化
减少请求文件，用webpack打包css js至一个文件减少请求数。
节流函数懒加载：http://www.xhrsama.com/javaScript/lazyLoad/
