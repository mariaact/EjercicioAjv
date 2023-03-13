var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser');
const Ajv = require('ajv');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


const ajv = new Ajv();

app.use(bodyParser.json());

// Se define la ruta POST para el JSON1
app.post('/validarjson1', (req, res) => {
  try {
    const schema1 = require('./schema1.json');
    const isValid = ajv.validate(schema1, req.body);

    if (isValid) {
      res.status(200).send('JSON1 is valid');
    } else {
      console.log("isvalided false");
      res.status(400).send('JSON1 is not valid');
    }
  } catch (error) {
    console.log("error");
    res.status(400).send(error.message);
  }
});

app.post('/validarjson2', (req, res) => {
  try {
    const schema2 = require('./schema2.json');
    const isValid2 = ajv.validate(schema2, req.body);

    if (isValid2) {
      res.status(200).send('JSON2 is valid');
    } else {
      console.log("isvalided false");
      res.status(400).send('JSON1 is not valid');
    }
  } catch (error) {
    console.log("error");
    res.status(400).send(error.message);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
