var express = require('express');
var dotenv = require('dotenv');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var rateLimit = require("express-rate-limit");

dotenv.config();

mongoose.Promise = require('bluebird');
mongoose.connect( process.env.DB_URI, { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var routes = require('./api/routes/Routes');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
// app.use(express.static(path.join(__dirname, 'build')));


//Enable corss
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Rate limit configuration
const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes 
  windowMs: 1 * 60 * 1000, // 1 minutes block user ip
  max: 2, // limit each IP to 100 requests per windowMs
  message: "Sorry, the maximum limit of logins has been reached!"
  
});

app.use('/api/cards', routes);
app.use("/api/cards", limiter);

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

var port = process.env.PORT || 3001;  
app.listen(port);

module.exports = app;
