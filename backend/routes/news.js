const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.post('/news/add', (req, res) => {
    const { title, content, source, date, verdict } = req.body;
    if (!title || !content || !source || !date || !verdict) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const stmt = db.prepare(`INSERT INTO news (title, content, source, date, verdict) VALUES (?, ?, ?, ?, ?)`);
    stmt.run(title, content, source, date, verdict, function(err) {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        res.status(201).json({ message: "News added successfully!", id: this.lastID });
    });
    stmt.finalize();
});

// Obținere toate știrile
router.get('/news', (req, res) => {
    db.all(`SELECT * FROM news`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
