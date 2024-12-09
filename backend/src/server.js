const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Lyriks Backend Server!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});