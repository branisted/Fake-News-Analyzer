const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/database");

const router = express.Router();
const SECRET_KEY = "super_secret_key"; // Ar trebui stocat într-un fișier .env

// Înregistrare utilizator
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: "Toate câmpurile sunt necesare" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role],
        (err) => {
            if (err) {
                return res.status(400).json({ message: "Utilizatorul există deja" });
            }
            res.status(201).json({ message: "Utilizator creat!" });
        }
    );
});

// Login utilizator
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Autentificare eșuată" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Parolă incorectă" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    });
});

module.exports = router;