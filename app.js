var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var supervisor_index = require ('./routes/supervisor_index');
var supervisor_view_all = require ('./routes/supervisor_view_all_contracts');
var supervisor_view_my = require ('./routes/supervisor_view_my_contracts');
var supervisorviewstatsRouter = require('./routes/supervisor_viewstats');
var supervisorPropertiesRouter = require('./routes/supervisor_viewproperties');

var customerIndexRouter = require('./routes/customer_index');
var customerCreateTasksRouter = require('./routes/customer_createtasks');
var customerSignContractsRouter = require('./routes/customer_signcontracts');
var customerViewTasksRouter = require('./routes/customer_viewtasks');
var customerWriteReviewsRouter = require('./routes/customer_writereviews');
var customerMyReviewsRouter = require('./routes/customer_myreviews');
var customerPropertiesRouter = require('./routes/customer_viewproperties');

var freelancerIndexRouter = require('./routes/freelancer_index');
var freelancerBidTaskRouter = require('./routes/freelancer_bidtask');
var freelancerViewContractsRouter = require('./routes/freelancer_viewcontracts');
var freelancerViewTasksRouter = require('./routes/freelancer_viewtasks');
var freelancerViewReviewsRouter = require('./routes/freelancer_viewreviews');
var freelancerPropertiesRouter = require('./routes/freelancer_viewproperties');

var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// add & configure middleware
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  saveUninitialized: false,
  resave: false,
  cookie: {
      expires: 600000
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index',indexRouter);
app.use('/users', usersRouter);

app.use('/supervisor_index', supervisor_index);
app.use('/supervisor_view_all', supervisor_view_all);
app.use('/supervisor_view_my', supervisor_view_my);
app.use('/supervisor_viewstats',supervisorviewstatsRouter);
app.use('/supervisor_viewproperties',supervisorPropertiesRouter);

app.use('/customer_index',customerIndexRouter);
app.use('/customer_viewtasks',customerViewTasksRouter);
app.use('/customer_createtasks',customerCreateTasksRouter);
app.use('/customer_writereviews',customerWriteReviewsRouter);
app.use('/customer_myreviews',customerMyReviewsRouter);
app.use('/customer_signcontracts',customerSignContractsRouter);
app.use('/customer_viewproperties',customerPropertiesRouter);

app.use('/freelancer_index',freelancerIndexRouter);
app.use('/freelancer_bidtask',freelancerBidTaskRouter);
app.use('/freelancer_viewreviews',freelancerViewReviewsRouter);
app.use('/freelancer_viewcontracts',freelancerViewContractsRouter);
app.use('/freelancer_viewtasks',freelancerViewTasksRouter);
app.use('/freelancer_viewproperties',freelancerPropertiesRouter);

app.use('/login',loginRouter);
app.use('/register',registerRouter);

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
