const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const { intializeMongoDB } = require('./db/db');

intializeMongoDB();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopsRouter = require('./routes/shops');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shops', shopsRouter);

module.exports = app;
