const express = require('./diy');
const app = express();
app.get('/home', (req, res) => {
    res.end('home');
});

app.get('/haha', (req, res) => {
    res.end('haha');
});

app.post('/test', (req, res) => {
    res.end('test');
});

app.listen(3000, () => {
    console.log(`server is starting in prot 3000`);
});
