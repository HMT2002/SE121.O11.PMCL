const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const Output = require('../models/mongo/Output');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const moment = require('moment');

exports.Create = catchAsync(async (req, res, next) => {
  req.body.outputStandard.forEach(async (id) => {
    const output = await Output.findOne({ _id: id });
    id = output;
  });

  req.body.rubric.forEach(async (id) => {
    const rubric = await Rubric.findOne({ _id: id });
    id = rubric;
  });

  const evaluate = await Evaluate.create({ ...req.body });
  res.status(200).json({
    status: 'success',
    evaluate,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Get = catchAsync(async (req, res, next) => {
  const evaluates = await Evaluate.find({});
  res.status(200).json({
    status: 'success',
    evaluates,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Update = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
