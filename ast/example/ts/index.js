const fs = require('fs');
const path = require('path');
const recast = require('recast');

const content = fs.readFileSync(path.resolve(__dirname, './demo.ts'), 'utf-8');
console.log(content);

console.log(recast.parse(content));
