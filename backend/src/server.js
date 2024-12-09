const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(session({
    secret: 'abcdefg',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
}));

app.use('/auth', authRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('welcome to Backend');
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});