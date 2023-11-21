const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const moment = require('moment');
const Output = require('../models/mongo/Output');

exports.Create = catchAsync(async (req, res, next) => {

  const output=await Output.create({...req.body});

  res.status(200).json({
    status: 200,
    output,
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});

exports.Get = catchAsync(async (req, res, next) => {

  const output=await Output.find({});

  res.status(200).json({
    status: 200,
    output,
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});exports.Update = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});

