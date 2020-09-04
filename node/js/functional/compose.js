/**
 * 函数组合
 */
const _ = require('lodash');

const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, arr) => _.join(arr, sep));
const map = _.curry((fn, arr) => _.map(arr, fn));

const trace = _.curry((tag, v) => {
  console.log(tag, v);
  return v;
});

const f = _.flowRight(join('-'), trace('map'), map(_.toLower), split(' '));

console.log(f('HELLO World fish'));
