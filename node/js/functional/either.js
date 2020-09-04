/**
 * either函子
 * 设定了两种情况，分别执行
 */

class Left {
  static of(value) {
    return new Left(value);
  }

  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return this;
  }
}

class Right {
  static of(value) {
    return new Right(value);
  }

  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return Right.of(fn(this.value));
  }
}

// const r1 = Right.of(12).map(x => x + 2);
// const r2 = Left.of(12).map(x => x + 2);
// console.log(r1, r2);

function parseJson(str) {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of(e.message);
  }
}

const r = parseJson('{"name": 1}').map(x => x.name);
console.log(r);
