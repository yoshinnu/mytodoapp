const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const schedule = require('./controllers/schedule/schedule.js');
const registerRouter = require('./routes/register.js');
const loginRouter = require('./routes/login.js');
const homeRouter = require('./routes/home.js');
const adminRouter = require('./routes/admin.js');
const clientRouter = require('./routes/client.js');
const userRouter = require('./routes/user.js');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
//login
app.use('/', loginRouter);
//signup
app.use('/signup', registerRouter);
//home
app.use('/home', homeRouter);
//admin
app.use('/admin', adminRouter);
//client
app.use('/client', clientRouter);
//user
app.use('/user', userRouter);
//mailerscedule
schedule.limitTodoEmail();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
