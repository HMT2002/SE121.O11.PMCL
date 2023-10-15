'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const cors = require('cors');
var path = require('path');
const fs = require('fs');
const globalErrorHandler = require('./controllers/errorController');

// const client_posts = JSON.parse(fs.readFileSync('./json-resources/client_posts.json'));

//MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
}
console.log(process.env.NODE_ENV);
app.use(express.json());
app.use(express.static('public'));

app.use(cors());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  // );

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.requestTime);
  //console.log(req.headers);
  req.url = decodeURIComponent(req.url);

  next();
});


//ROUTES
const defaultRoute = require('./routes/defaultRoute');
const contentRoute = require('./routes/contentRoute');
const evaluateRoute = require('./routes/evaluateRoute');
const outputRoute = require('./routes/outputRoute');
const reviewRoute = require('./routes/reviewRoute');
const rubricRoute = require('./routes/rubricRoute');
const subjectRoute = require('./routes/subjectRoute');
const userRoute = require('./routes/userRoute');

const authRoute = require('./routes/authRoute');

app.use('/api/v1/', defaultRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/content', contentRoute);
app.use('/api/v1/evaluate', evaluateRoute);
app.use('/api/v1/output', outputRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/rubric', rubricRoute);
app.use('/api/v1/subject', subjectRoute);
app.use('/api/v1/users', userRoute);


app.all('*', (req, res, next) => {
  next(new AppError('Cant find ' + req.originalUrl + ' on the server', 404));
});
app.use(globalErrorHandler);

module.exports = app;
