const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
