var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contentRouter = require('./routes/content');
var mediacontentRouter = require('./routes/mediacontent');
var userRouter = require('./routes/user');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var panelRouter = require('./routes/panel');
var subpanelRouter = require('./routes/subpanel');
var customerRouter = require('./routes/customer');
var conversationRouter = require('./routes/conversation');
var orderRouter = require('./routes/order');
var orderitemRouter = require('./routes/orderitem');
var orderhistoryRouter = require('./routes/orderhistory');
var productsRouter = require('./routes/products');

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
app.use('/content', contentRouter);
app.use('/mediacontent', mediacontentRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/panel', panelRouter);
app.use('/subpanel', subpanelRouter);
app.use('/customer', customerRouter);
app.use('/conversation', conversationRouter);
app.use('/order', orderRouter);
app.use('/orderitem', orderitemRouter);
app.use('/orderhistory', orderhistoryRouter);
app.use('/products', productsRouter);


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
