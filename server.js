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

app.delete('/cards/:id', (req, res) => {
    // open db connection
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    // delete card with id
    db.run('DELETE FROM cards WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Card deleted successfully');
        // close db connection
        db.close();
        // return card deleted
        res.json({message: 'Card deleted successfully'});
    });
});

// be able to change front and back of card with a certain id
app.put('/cards-text/:id', (req, res) => {
    // open db connection
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    // change card with id
    db.run('UPDATE cards SET front = ?, back = ? WHERE id = ?', [req.body.front, req.body.back, req.params.id], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Card text updated successfully');
        // close db connection
        db.close();
        // return card updated
        res.json({message: 'Card updated successfully'});
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


// insert a new category into the db 
app.post('/insert-category', (req, res) => {
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    // insert category
    db.run('INSERT INTO categories (category_name) VALUES (?)', [req.body.category_name], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Category inserted successfully');
        // close db connection
        db.close();
        // return card
        res.json({status: 'success'});
    });
});	


app.get('/category', (req, res) => {
    // open db connection
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
    // select all categories from the categories table 
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('All rows fetched successfully');
        res.json(rows);
        // close db connection
        db.close();
    });
});


app.listen(process.env.PORT, process.env.URL, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

