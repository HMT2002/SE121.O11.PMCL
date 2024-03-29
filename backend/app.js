'use strict';
const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const cors = require('cors');
var path = require('path');
const fs = require('fs');
const loggerAPI = require('./modules/loggerAPI');

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
const syllabusRoute = require('./routes/syllabusRoute');
const rubricRoute = require('./routes/rubricRoute');
const courseRoute = require('./routes/courseRoute');
const departmentRoute = require('./routes/departmentRoute');
const historyRoute = require('./routes/historyRoute');
const levelOfTeachingRoute = require('./routes/levelOfTeachingRoute');
const programOutcomeRoute = require('./routes/programOutcomeRoute');
const programOutcomeAssertmentRoute = require('./routes/programOutcomeAssertmentRoute');
const courseAssessElementRoute = require('./routes/courseAssessElementRoute');

const userRoute = require('./routes/userRoute');
const notificationRoute = require('./routes/notificationRoute');

const authRoute = require('./routes/authRoute');

app.use('/api/v1/', defaultRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/content', contentRoute);
app.use('/api/v1/evaluate', evaluateRoute);
app.use('/api/v1/output', outputRoute);
app.use('/api/v1/syllabus', syllabusRoute);
app.use('/api/v1/rubric', rubricRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/department', departmentRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/notification', notificationRoute);
app.use('/api/v1/history', historyRoute);
app.use('/api/v1/levelofteaching', levelOfTeachingRoute);
app.use('/api/v1/programoutcome', programOutcomeRoute);
app.use('/api/v1/programoutcomeassertment', programOutcomeAssertmentRoute);
app.use('/api/v1/courseassesselement', courseAssessElementRoute);

app.all('*', (req, res, next) => {
  next(new AppError('Cant find ' + req.originalUrl + ' on the server', 404));
});
app.use(globalErrorHandler);

module.exports = app;
