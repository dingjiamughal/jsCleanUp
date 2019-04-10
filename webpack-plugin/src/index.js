import {flatten} from 'lodash';

const arr = [1, [2, 3], [4, [5, 6]]];
const result = flatten(arr);

console.log(result);

// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }

// async function async2() {
//     console.log('async2')
// }

// console.log('script start');

// setTimeout(() => {
//     console.log('setTimeout');
// });

// async1();

// new Promise(resolve => {
//     console.log('promise1');
//     resolve();
// }).then(() => {
//     console.log('promise2');
// });

// console.log('script end');
