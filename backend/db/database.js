const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Creează/Conectează baza de date
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to DB:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

module.exports = db;

