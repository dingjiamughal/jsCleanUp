const fp = require('lodash/fp');

// world wild web => W. W. W
const f = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '));

console.log(f('world wild web'));
