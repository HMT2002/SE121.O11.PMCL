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
const { HistoryBodyConverter, HistoryModelConverter } = require('../converter/HistoryModel');
const { SyllabusBodyConverter, SyllabusModelConverter } = require('../converter/SyllabusModel');

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

exports.GetResponse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    history: req.history,
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
exports.GetAllBranchesFromHistory = catchAsync(async (req, res, next) => {
  const history = await History.findOne({ _id: req.params.id });

  const branches = await historyAPI.GetHistoryBranches(history);

  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    branches,
    url: req.originalUrl,
  });
});

exports.GetBranchPrevHistory = catchAsync(async (req, res, next) => {
  const history = await History.findOne({ _id: req.params.id }).populate('prevHistory').lean();

  const branches = await historyAPI.GetHistoryPrevHistory(history);

  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    branches,
    url: req.originalUrl,
  });
});

exports.RestoreHistory = catchAsync(async (req, res, next) => {
  const history = req.history;
  const syllabus = req.syllabus;
  await syllabus.updateOne({ ...history.newValue, approved: false, mainHistory: history });
  await syllabus.save();
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    syllabus,
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
exports.ApproveHistory = catchAsync(async (req, res, next) => {
  req.history.approved = true;
  req.history.headMasterSignature = req.user.identifyNumber;
  req.history.approveDate = Date.now();
  await req.history.save();
  req.syllabus.approved = true;
  await req.syllabus.save();
  res.status(200).json({
    status: 'success approve',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RejectHistory = catchAsync(async (req, res, next) => {
  req.history.approved === false;
  req.history.headMasterSignature = req.user.identifyNumber;
  await req.syllabus.save();
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
