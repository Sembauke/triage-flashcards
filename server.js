const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
require('dotenv').config();
//import connect-db.js


app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cards', (req, res) => {
    // open db connection
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    // select all cards where category is null and limit to 1
    db.all('SELECT * FROM cards WHERE category IS NULL LIMIT 1', (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('All rows fetched successfully');
        // close db connection
        db.close();
        // return card
        res.json({id: rows[0].id, front: rows[0].front, back: rows[0].back, category: rows[0].category});
    });

});

app.post('/update-card-category', (req, res) => {

    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    // update card category
    db.run('UPDATE cards SET category = ? WHERE id = ?', [req.body.category, req.body.id], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Card category updated successfully');
        // close db connection
        db.close();
        // return card
        res.json({status: 'success'});
    });

});

app.listen(process.env.PORT, process.env.URL, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

