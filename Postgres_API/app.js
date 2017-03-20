var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

var app = express();

// String.prototype.toDate = function(format)
// {
//   var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
//   var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
//   var formatItems     = normalizedFormat.split('-');
//   var dateItems       = normalized.split('-');

//   var monthIndex  = formatItems.indexOf("mm");
//   var dayIndex    = formatItems.indexOf("dd");
//   var yearIndex   = formatItems.indexOf("yyyy");
//   var hourIndex     = formatItems.indexOf("hh");
//   var minutesIndex  = formatItems.indexOf("ii");
//   var secondsIndex  = formatItems.indexOf("ss");

//   var today = new Date();

//   var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
//   var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
//   var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

//   var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
//   var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
//   var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

//   return new Date(year,month,day,hour,minute,second);
// };


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'Police.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});


module.exports = app;
