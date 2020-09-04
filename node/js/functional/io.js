/**
 * io 函子
 * 把值缓存起来，用的时候再调用
 */
const fp = require('lodash/fp');

class IO {
  static of(x) {
    return new IO(() => x);
  }

  constructor(fn) {
    this.value = fn;
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this.value));
  }
}

const r = IO.of(process).map(p => p.execPath);
console.log(r);
