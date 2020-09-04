/**
 * folktale
 */
const { compose, curry } = require('folktale/core/lambda');
const _ = require('lodash');

const r = curry(2, (x, y) => x + y);

console.log(r(1, 2)); // 3
console.log(r(1)(2)); // 3

const c = compose(_.toUpper, _.first);
console.log(c(['one', 'two'])); // ONE
