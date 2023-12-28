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
const Assignment = require('../models/mongo/Assignment');

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

exports.AssignUserToCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const userID = req.body.user;
  const assignment = await Assignment.findOne({ course: course._id });
  const user = await User.findById(userID);
  if (!user) {
    res.status(200).json({
      status: 400,
      message: 'Not found user',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  assignment.users.push(user._id);
  await assignment.save();

  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.ResignUserFromCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const userID = req.body.user;
  const assignment = await Assignment.findOne({ course: course._id });
  const user = await User.findById(userID);
  if (!user) {
    res.status(200).json({
      status: 400,
      message: 'Not found user',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const index = assignment.users.indexOf(user._id);
  if (index > -1) {
    // only splice array when item is found
    assignment.users.splice(index, 1); // 2nd parameter means remove one item only
    await assignment.save();
  }

  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetCourseAssignment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const assignment = await Assignment.findOne({ course: course._id })
    .populate('users')
    .populate([{ path: 'user', strictPopulate: false }])
    .populate('course')
    .populate({ path: 'course', populate: { path: 'department' } });
  if (!assignment) {
    res.status(200).json({
      status: 400,
      message: 'Not found assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetUserCourseAssignment = catchAsync(async (req, res, next) => {
  const user = req.user;
  const assignment = await Assignment.find({ users: user._id })
    .populate('users')
    .populate('course')
    .populate({ path: 'course', populate: { path: 'department' } });
  if (!assignment) {
    res.status(200).json({
      status: 400,
      message: 'Not found assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllCourseAssignment = catchAsync(async (req, res, next) => {
  const assignments = await Assignment.find({})
    .populate('course')
    .populate({ path: 'users', populate: { path: 'department', strictPopulate: false } })
    .populate({ path: 'course', populate: { path: 'department' } });
  if (!assignments.length === 0) {
    res.status(200).json({
      status: 400,
      message: 'Not found any assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignments,
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
