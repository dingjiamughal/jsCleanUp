/**
 * maybe 函子
 * 不能定位null的位置
 */

class MayBe {
  static of(value) {
    return new MayBe(value);
  }

  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return this.isNull ? MayBe.of(null) : MayBe.of(fn(this.value));
  }

  isNull() {
    return this.value === null || this.value === undefined;
  }
}

MayBe.of(null).map(x => x + 1); // null

MayBe.of(3)
  .map(null)
  .map(x => x + 1); // null
