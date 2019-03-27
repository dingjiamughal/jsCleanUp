const express = require('./lib/express');
const app = express();

app.get('/', (req, res) => {
    res.end('hello');
});

app.listen(3001, () => {
    console.log('server started on port 3001');
});
