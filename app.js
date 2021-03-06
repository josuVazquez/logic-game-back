require('dotenv').config({path: __dirname + '/env/.env'});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var quizzCode = require('./scheduleJobs/quizzCode');
var quizzRouter = require('./routes/quizz');
var subRouter = require('./routes/sub');
var rankingRouter = require('./routes/ranking');
const cron = require('node-cron');
const cors = require('cors');

require('./dbConfig');

var app = express();

const quizzCodeJob = cron.schedule('00 00 * * *', () => {
   quizzCode.generate();
   quizzCode.sendNewsletter();
  },
  {timezone: 'UTC'}
  );
  
quizzCodeJob.start();

app.set('port', 3000);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/quizz', quizzRouter);
app.use('/sub', subRouter);
app.use('/ranking', rankingRouter);

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