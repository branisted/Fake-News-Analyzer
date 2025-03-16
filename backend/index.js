const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS
app.use(cors());

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', newsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
