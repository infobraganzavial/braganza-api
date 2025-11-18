require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const whitelist = ['http://localhost:8081', 'https://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const routerApi = require('./routes');
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routerApi(app);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('err handler', req.app.get('env'));
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log("Error: " + res.locals.error.status);
  console.log("Description: " + res.locals.error.stack);
  const data = {
    status: res.locals.error.status,
    title: 'Error:'+ res.locals.error.status,
    message:  res.locals.message,
    err: true
  }
  res.send(data);
});

module.exports = app;
