/**
 * task 函子
 * 处理异步任务
 */

const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const fp = require('lodash/fp');

function readFile(filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        resolver.reject(err);
      }

      resolver.resolve(data);
    });
  });
}

readFile('package.json')
  .map(fp.split('\n'))
  .map(fp.find(x => x.includes('version')))
  .run()
  // .promise();
  .listen({
    onRejected: err => {
      console.log(err);
    },
    onResolved: value => {
      console.log(value);
    }
  });
// console.log(file);
