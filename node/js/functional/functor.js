/**
 * functor 函子
 */

class Functor {
  static of(value) {
    return new Functor(value);
  }

  constructor(value) {
    this.value = value;
  }

  map(fn) {
    return Functor.of(fn(this.value));
  }
}

Functor.of(1)
  .map(x => x + 1)
  .map(x => x * x);
