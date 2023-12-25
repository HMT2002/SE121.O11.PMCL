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
  const testCourse = await Course.find({ code: req.body.code }).populate('department');
  if (testCourse.length !== 0) {
    res.status(200).json({
      status: 'unsuccess',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const course = await Course.create({ ...req.body });
  res.status(200).json({
    status: 'success',
    data: course,
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
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  const courses = await Course.find({}).populate('department');
  res.status(200).json({
    status: 'success',
    data: courses,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Update = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('department');
  if (course === undefined || !course) {
    return next(new AppError('No course found!', 404));
  }
  const { courseCode, courseNameVN, courseNameEN } = req.body;
  course.courseCode = courseCode;
  course.courseNameEN = courseNameEN;
  course.courseNameVN = courseNameVN;
  await course.save();
  res.status(200).json({
    status: 'success',
    data: course,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('department');
  if (course === undefined || !course) {
    return next(new AppError('No course found!', 404));
  }
  await course.deleteOne();
  res.status(200).json({
    status: 'success delete course',

    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
