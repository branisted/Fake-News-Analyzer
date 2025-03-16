const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Salvare știre nouă
router.post('/add', (req, res) => {
    const { title, content, source, date, verdict } = req.body;
    const sql = `INSERT INTO news (title, content, source, date, verdict) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [title, content, source, date, verdict], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'News saved', id: this.lastID });
    });
});

// Obține toate știrile
router.get('/all', (req, res) => {
    db.all(`SELECT * FROM news`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.json({ news: rows });
    });
});

module.exports = router;
