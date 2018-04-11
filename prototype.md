# prototype的实际应用

## zepto 实现原型
```javascript
(function(window){
  var zepto = {};

  var $ = function(selector){
    return zepto.init(selector)
  }

  window.$ = $;

  zepto.init = function(selector){
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector))
    return zepto.Z(dom,selector)
  }

  function Z(dom,selector) {
    var len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ""
  }
  zepto.Z = function(dom,selector){
    return new Z(dom,selector)
  }

  // Z.prototype = {...}
  $.fn = {
    constructor:zepto.Z,
    css:function(key,value){},
    html:function(value){}
  }
  zepto.Z.prototype = Z.prototype = $.fn

})(window)
```

## jQuery 实现原型
```js
(function(window){
  var jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  }
  jQuery.fn = {};
  
  var init = jQuery.fn.init = function(){
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))

    var len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ""
  }

  jQuery.fn = jQuery.prototype = {
    constructor:jQuery,
    css:function(){},
    html:function(){}
  }
  //构造函数的原型 = 一个对象
  init.prototype = jQuery.fn;

  window.$ = jQuery
})(window)
```
