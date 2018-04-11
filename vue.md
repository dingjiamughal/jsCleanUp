# mvvm和vue

## jquery和vue的区别
* jQuery数据和视图的没分离，操作dom
* vue以数据驱动视图，通过修改数据自动改变视图

## 如何理解mvvm

data --- m
html --- v
new Vue() --- vm

## vue如何实现响应式
>什么是响应式
Object.defineProperty
修改data，vue立刻能监听到，为什么？

```javascript
  var obj={}
  var name="zhangsan"
  Object.defineProperty(obj,"name",{
    get:function(){
      return name
      console.log("get")
    },
    set:function(newVal){
      name=newVal
      console.log("set")
    }
  })
  // 这样就能监听到值的变化
/******************************************************************/
  var vm = {}
  var data = {
      name: "zhangsan",
      age: 20
  }
  for (var key in data) {
      (function (key) {
          Object.defineProperty(vm, key, {
              get: function () {
                  console.log("get") // 监听
                  return data[key]
              },
              set: function (newVal) {
                  console.log("set") // 监听
                  data[key] = newVal
              }
          })
      })(key)
  }

```

## vue模板渲染
模板需要转换成js代码

var obj = {
  name:"zhangsan",
  age:20,
  getAddress:function({
    console.log("getaddress")
  })
}

function fn(){
  with(obj){
    console.log(name)
    console.log(age)
    getAddress()
  }
}
fn();

## vue中的render函数

```html
  <div id="app">
    <p>{{price}}<p>
  </div>
```
```js
with(this) { //this == vm
  return _c(
    "div",
    {
      attrs:{"id":"app"}
    },
    [
      _c("p",[_v(_s(price))])
    ]
  )
}
```
