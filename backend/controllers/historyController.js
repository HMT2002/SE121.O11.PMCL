const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const History = require('../models/mongo/History');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const historyAPI = require('../modules/historyAPI');
const { HistoryBodyConverter, HistoryModelConverter } = require('../converters/HistoryModel');
const { SyllabusBodyConverter, SyllabusModelConverter } = require('../converters/SyllabusModel');

exports.Create = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const history = await History.findOne({ _id: id }).populate({ path: 'syllabus', select: '-__v' });
  const objname = 'history';
  if (!history) {
    return next(new AppError('Cant find ' + objname + ' with id ' + id, 404));
  }
  const syllabus = await Syllabus.findOne({ _id: history.syllabus._id });

  let syllabusModel = SyllabusModelConverter(syllabus);
  req.syllabusModel = syllabusModel;
  let historyModel = HistoryModelConverter(history);
  req.historyModel = historyModel;

  req.syllabus = syllabus;
  req.history = history;
  next();
});

exports.GetByCourseID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const history = await History.findOne({ course: id })
    .populate({ path: 'syllabuses', select: '-__v' })
    .populate({ path: 'versions', select: '-__v' });
  const objname = 'history';
  if (!history) {
    return next(new AppError('Cant find ' + objname + ' with id ' + id, 404));
  }
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    data: history,
    url: req.originalUrl,
  });
});

exports.GetResponse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    data: req.history,
    url: req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllBySyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
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
