const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    res.send('home');
});

app.get('/route', (req, res) => {
    res.send(req.route);
});

app.get('*', (req, res) => [
    res.send('404')
]);

app.listen(8800);
