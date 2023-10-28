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

exports.Create = catchAsync(async (req, res, next) => {
  const testSyllabus=await Syllabus.find({});
  if(testSyllabus.length!==0){
    res.status(200).json({
      status: 'unsuccess',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const syllabus=await Syllabus.create({...req.body});
  res.status(200).json({
    status: 'success',
    syllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Get = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {


  const syllabusDepartment=await Syllabus.find({departmentCode:req.params.id})
  res.status(200).json({
    status: 'success',
    syllabusDepartment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {

  const syllabusUser=await Syllabus.find({lectureID:req.params.id});
  res.status(200).json({
    status: 'success',
    syllabusUser,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByCourse = catchAsync(async (req, res, next) => {
  const syllabusCourse=await Syllabus.find({courseCode:req.params.id});

  res.status(200).json({
    status: 'success',
    syllabusCourse,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  const syllabusses = await Syllabus.find({});
  res.status(200).json({
    status: 'success',
    syllabusses,
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

exports.SubmitSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.ApproveSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RequestReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RejectSyllabus = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetSyllabusHitory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
