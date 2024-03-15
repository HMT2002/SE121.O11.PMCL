const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const CourseOutcome = require('../models/mongo/CourseOutcome');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.Create = catchAsync(async (req, res, next) => {
  const { courseCode } = req.body;
  const testContent = await Content.find({ courseCode: courseCode });
  if (testContent.length !== 0) {
    res.status(200).json({
      status: 'unsuccess, alreadey exist course code',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  req.body.courseCode = await Course.findOne({ _id: courseCode }).populate('department');

  req.body.courseOutcomes.forEach(async (id) => {
    const outcome = await CourseOutcome.findOne({ _id: id });
    id = outcome;
  });
  req.body.evaluatePart.forEach(async (id) => {
    const eval = await Evaluate.findOne({ _id: id });
    id = eval;
  });

  const content = await Content.create({ ...req.body });
  res.status(200).json({
    status: 200,
    data: content,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Get = catchAsync(async (req, res, next) => {
  const contents = await Content.find({});

  res.status(200).json({
    status: 200,
    data: contents,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Update = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
