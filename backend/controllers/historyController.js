const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

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
const moment = require('moment');

exports.Create = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.Get = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.GetAllBySyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});
exports.Update = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.SubmitSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports. ApproveSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.RequestReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.RejectSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});

exports.GetSyllabusHitory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});