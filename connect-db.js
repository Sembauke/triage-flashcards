const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

exports.selectAllCardsWithNullCategory = function () {
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });

    db.all('SELECT * FROM cards WHERE category IS NULL LIMIT 1', (err, rows) => {
        if (err) {
            return console.log(err.message)
        }
        fs.writeFile('./cards-jwasham.json', JSON.stringify(rows), (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('The file was saved!');
        });
    });
    db.close();
}

// Make a function that updates the category of a card
exports.updateCategory = function (cardId, category) {
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    db.run('UPDATE cards SET category = ? WHERE id = ?', [category, cardId], (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Card updated successfully');
    });
    db.close();
}

// Make a function that selects all categories from the card table
exports.selectAllCategories = function () {
    const db = new sqlite3.Database('./db/cards-jwasham.db', sqlite3.OPEN_READWRITE, (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        console.log('Database opened successfully');
    });
    db.all('SELECT category FROM cards', (err, rows) => {
        if (err) {
            return console.log(err.message);
        }
        fs.writeFile('./cards-jwasham.json', JSON.stringify(rows), (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log('The file was saved!');
        });
    });
    db.close();
}


console.log(exports.selectAllCardsWithNullCategory());
