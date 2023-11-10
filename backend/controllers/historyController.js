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
const historyAPI= require('../modules/historyAPI');


exports.Create = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});

exports.Get = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});
exports.GetAllBranchesFromHistory = catchAsync(async (req, res, next) => {

  const history=await History.findOne({_id:req.params.id});

  const branches=await historyAPI.GetHistoryBranches(history);

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    branches,
    url:req.originalUrl,
  });
});

exports.GetBranchPrevHistory = catchAsync(async (req, res, next) => {

  const history=await History.findOne({_id:req.params.id}).populate('prevHistory').lean();

  const branches=await historyAPI.GetHistoryPrevHistory(history);

  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    branches,
    url:req.originalUrl,
  });
});


exports.GetAllBySyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});



exports.GetAll = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});
exports.Update = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
        requestTime: req.requestTime,
    url:req.originalUrl,
  });
});
