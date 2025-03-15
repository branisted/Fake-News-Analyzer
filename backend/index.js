const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);