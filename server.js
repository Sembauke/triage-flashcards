const express = require('express');
const app = express();
require('dotenv').config();
//import connect-db.js
const dbrequest = require('./connect-db.js');

app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cards', (req, res) => {
    res.sendFile(__dirname + '/cards-jwasham.json')
    dbrequest.selectAllCardsWithNullCategory();
});

app.post('/update-card-category', (req, res) => {
    console.log(req.body)
    const cardId = req.body.id;
    const category = req.body.category;
    dbrequest.updateCategory(cardId, category);
    res.sendStatus(200);
});

app.listen(process.env.PORT, process.env.URL, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

