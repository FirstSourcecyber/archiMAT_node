var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require('./routes/userRouter');
var categoryRouter = require('./routes/categoryRouter');
var subcategoryRouter = require('./routes/subcategoryRouter');
var companyRouter = require('./routes/companyRouter');
var shopRouter = require('./routes/shopRouter');
var shoptypeRouter = require('./routes/shoptypeRouter');
var productRouter = require('./routes/productRouter');
var roleRouter = require('./routes/roleRouter');
var companyTypeRouter = require('./routes/companytypeRouter');
var colorRouter = require('./routes/colorRouter');
var materialRouter = require('./routes/materialRouter');
var fileRouter = require('./routes/file');
var serviceRouter = require('./routes/serviceRouter');
var fallowRouter = require('./routes/fallowRouter');
var inboxRouter = require('./routes/inboxRouter');
var materialrouter = require('./routes/material');
var homerouter = require('./routes/home');
var searchrouter = require('./routes/search');


var app = express();

// code to use cors i.e inter server relations
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token, Access-Id");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static('uploads'));
app.use(express.static(__dirname + '/uploads'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/company', companyRouter);
app.use('/shop', shopRouter);
app.use('/shoptype', shoptypeRouter);
app.use('/product', productRouter);
app.use('/role', roleRouter);
app.use('/companytype', companyTypeRouter);
app.use('/color', colorRouter);
app.use('/material', materialRouter);
app.use('/file', fileRouter);
app.use('/service', serviceRouter);
app.use('/fallow', fallowRouter);
app.use('/inbox', inboxRouter);
app.use('/storematerial', materialrouter);
app.use('/home', homerouter);
app.use('/search', searchrouter);

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
