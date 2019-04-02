var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var customerIndexRouter = require('./routes/customer_index');
var customerCreateTasksRouter = require('./routes/customer_createtasks');
var customerSignContractsRouter = require('./routes/customer_signcontracts');
var customerViewTasksRouter = require('./routes/customer_viewtasks');
var customerWriteReviewsRouter = require('./routes/customer_writereviews');
var customerMyReviewsRouter = require('./routes/customer_myreviews');

var freelancerIndexRouter = require('./routes/freelancer_index');
var freelancerViewTasksRouter = require('./routes/freelancer_viewtasks');

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

app.use('/customer_index',customerIndexRouter);
app.use('/customer_viewtasks',customerViewTasksRouter);
app.use('/customer_createtasks',customerCreateTasksRouter);
app.use('/customer_writereviews',customerWriteReviewsRouter);
app.use('/customer_myreviews',customerMyReviewsRouter);
app.use('/customer_signcontracts',customerSignContractsRouter);

app.use('/freelancer_index',freelancerIndexRouter);
app.use('/freelancer_viewtasks',freelancerViewTasksRouter);

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