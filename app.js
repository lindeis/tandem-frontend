const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('index.pug')
})

app.use(express.static('public'));
app.get('/login', function (req, res) {
    res.render('login.pug')
})

app.use(express.static('public'));
app.get('/register', function (req, res) {
    res.render('register.pug')
})

app.use(express.static('public'));
app.get('/lobby', function (req, res) {
    res.render('lobby.pug')
})

app.use(express.static('public'));
app.get('/room', function (req, res) {
    res.render('room.pug')
})

app.post('/login', function () {
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));