const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('index.pug')
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));