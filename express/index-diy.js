const express = require('./diy');
const app = express();

app.param('name', (req, res, next, name) => {
    req.user = {name: 'dingjia', age: 21};
    next();
});
app.get('/home', (req, res) => {
    res.end('home');
});

app.get('/haha', (req, res) => {
    res.end('haha');
});

app.get('/test/:name/:age', (req, res) => {
    console.log(req.user);
    res.end('ok');
});

app.post('/test', (req, res) => {
    res.end('test');
});

app.listen(3000, () => {
    console.log(`server is starting in prot 3000`);
});
