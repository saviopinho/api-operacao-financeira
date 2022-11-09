const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/ErrorHandler');

require('express-async-errors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use('/people', require('./routes/people'));
app.use('/login', require('./routes/login'));
app.use('/accounts', require('./routes/accounts'));
app.use('/cards', require('./routes/cards'));
app.use(errorMiddleware);

module.exports = app;
