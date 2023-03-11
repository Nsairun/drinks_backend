const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotEnv = require("dotenv")
const cors = require("cors")
dotEnv.config();

const indexRouter = require('./drinks_db/routes/index');
const usersRouter = require('./drinks_db/routes/users');
const Relate = require('./drinks_db/dataBase/relationship');
const drinksRouter = require('./drinks_db/routes/drinks');
const categoriesRouter = require('./drinks_db/routes/categories')
const glassesRouter = require('./drinks_db/routes/glasses')
const ingredientsRouter = require('./drinks_db/routes/ingredients')


const app = express();
Relate();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);
app.use('/categories', categoriesRouter);
app.use('/glasses',glassesRouter )
app.use('/ingredients', ingredientsRouter)


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
