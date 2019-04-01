const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('dj'));

app.get('/home', (req, res) => {
    res.send('home');
});

app.route('/route').get((req, res) => {
    console.log('get');
    res.send('get');
}).post((req, res) => {
    console.log('post');
    res.send('post');
}).all((req, res) => {
    console.log('all');
    res.send('all');
}).put((req, res) => {
    console.log('put');
    res.send('put');
});

app.get('/test/:name/age/:age', (req, res) => {
    res.send(req.params);
});

app.get('/write', (req, res) => {
    res.cookie('name', 'dingjia', {
        signed: true
    });
    res.end('cookie ok');
});

app.get('/read', (req, res) => {
    // console.log(req.cookies);
    console.log(req.signedCookies);
    res.end(req.signedCookies.name);
});

app.get('*', (req, res) => {
    res.send('404');
});

app.listen(8800);
