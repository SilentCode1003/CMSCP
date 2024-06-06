const express = require('express');
//eto
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');



const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 } // 1 minute for example
}));



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');


// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contentRouter = require('./routes/content');
const mediacontentRouter = require('./routes/mediacontent');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const subcategoryRouter = require('./routes/subcategory');
const panelRouter = require('./routes/panel');
const subpanelRouter = require('./routes/subpanel');
const customerRouter = require('./routes/customer');
const conversationRouter = require('./routes/conversation');
const orderRouter = require('./routes/order');
const orderitemRouter = require('./routes/orderitem');
const orderhistoryRouter = require('./routes/orderhistory');
const productsRouter = require('./routes/products');

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
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

// Error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
