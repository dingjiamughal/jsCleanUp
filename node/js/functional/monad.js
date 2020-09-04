/**
 * monad 函子
 * point 函子的变扁 => 如果生成了嵌套的函子，它会取出后者内部的值，保证返回的永远是一个单层的容器
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

  join() {
    return this.value;
  }

  flatMap(fn) {
    return this.map(fn).join();
  }
}

function readFile(filename) {
  return new IO(() => {
    return fs.readFileSync(filename, 'utf-8');
  });
}

function print(x) {
  return new IO(() => {
    console.log(x);
    return x;
  });
}

const r = readFile('package.json').flatMap(print);
console.log(r);
