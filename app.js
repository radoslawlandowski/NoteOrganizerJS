var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var tabs = require('./routes/tabs');
//var notes = require('./routes/notes');


var app = express();

var config;
if(process.env.NODE_ENV == "testing") {
  config = require('./configs/testing.json');
} else if (process.env.NODE_ENV == "production") {
  config = require('./configs/production.json');
} else {
  config = require('./configs/development.json');
};

var databaseName = config.dbSettings.db;
var host = config.dbSettings.host;

console.log(databaseName);

mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
//app.use('/api/users/:userId/tabs', tabs);
//app.use('/api/users/:id/notes', notes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// connect to MongoDB
mongoose.connect('mongodb://' + host + '/' + databaseName)
  .then(() =>  console.log('Successfully connected to database: ' + databaseName))
  .catch((err) => console.error(err));

module.exports = app;
