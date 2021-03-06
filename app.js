var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(function(req, res, next) {
  var start = new Date().getTime();
  res.on('finish', function () {
    console.log('Request handled in ' + (new Date().getTime() - start) + 'ms');
  });
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('nodesi').middleware({
  onError: function(src, error) {
    return '<!-- GET ' + src + '\n' + error.message + ' -->';
  }
}));

app.use(function(req, res, next) {
  req.esiOptions = {
    headers: {
      'X-Request-ID': req.get('x-request-id')
    }
  };
  next();
});

app.use('/book', routes);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      requestId: req.esiOptions.headers['X-Request-ID']
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
