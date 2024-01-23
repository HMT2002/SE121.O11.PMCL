const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const Outcome = require('../models/mongo/Outcome');
const Department = require('../models/mongo/Department');
const History = require('../models/mongo/History');
const CourseGoal = require('../models/mongo/CourseGoal');
const ProgramOutcome = require('../models/mongo/ProgramOutcome');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');
const notifyAPI = require('../modules/notifyAPI');
const loggerAPI = require('../modules/loggerAPI');

const {
  SyllabusBodyConverter,
  SyllabusModelConverter,
  SyllabusArrayModelConverter,
} = require('../converters/SyllabusModel');
const { HistoryBodyConverter, HistoryModelConverter } = require('../converters/HistoryModel');

const moment = require('moment');
const HistoryModel = require('../converters/HistoryModel');
const { SyllabusValidateStatus } = require('../constants/SyllabusValidateStatus');
const Assignment = require('../models/mongo/Assignment');

exports.Create = catchAsync(async (req, res, next) => {
  const { course } = req.body;
  console.log(req.body);

  const testCourse = await Course.findOne({ _id: course });
  if (!testCourse) {
    res.status(400).json({
      status: 'unsuccess, course code not found!',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }

  const history = await History.findOne({ course: testCourse._id });
  let syllabusObject = await SyllabusBodyConverter(req);
  const syllabus = await Syllabus.create({ ...syllabusObject, author: req.user });

  history.syllabuses.push(syllabus);
  await history.save();
  syllabus.mainHistory = history;
  syllabus.mainHistory = history._id;
  syllabus.save();

  //Logger
  await loggerAPI.LoggerDB(req, req.user.username + ' đã tạ đề cương mới cho môn ' + testCourse.courseNameVN);
  res.status(200).json({
    status: 200,
    data: syllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const syllabus = await Syllabus.findOne({ _id: id })
    .populate('course')
    .populate({ path: 'course', populate: { path: 'preCourse' } })
    .populate({ path: 'course', populate: { path: 'prerequisiteCourse' } })
    .populate('author')
    .populate('courseOutcomes')
    .populate('courseAssessments')
    .populate({ path: 'course', populate: { path: 'department' } })
    .populate({ path: 'courseOutcomes', populate: { path: 'courseGoal' } });

  // const syllabus = await Syllabus.findOne({ _id: id }).populate({ path: 'courseCode', select: '-__v' });

  const objname = 'syllabus';
  if (!syllabus) {
    return next(new AppError('Cant find ' + objname + ' with id ' + id, 404));
  }
  let syllabusModel = await SyllabusModelConverter(syllabus);
  req.syllabusModel = syllabusModel;

  req.syllabus = syllabus;
  next();
});

exports.GetByCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // const syllabus = await Syllabus.findOne({ course: id }).populate('course').populate('author');
  const course = await Course.findById(id).populate([{ path: 'department', strictPopulate: false }]);
  // const syllabus = await Syllabus.findOne({ _id: id }).populate({ path: 'courseCode', select: '-__v' });
  const history = await History.findOne({ course: id })
    .populate('course')
    .populate({ path: 'course', populate: { path: 'department' } })
    .populate('syllabuses')
    .populate({ path: 'syllabuses', populate: { path: 'author' } })
    .populate({ path: 'syllabuses', populate: { path: 'validator' } })
    .populate({ path: 'course', populate: { path: 'preCourse' } })
    .populate({ path: 'course', populate: { path: 'prerequisiteCourse' } })
    .populate('validator');

  // const objname = 'syllabus';
  // // if (!syllabus) {
  // //   return next(new AppError('Cant find ' + objname + ' with course ' + id, 404));
  // // }
  // let syllabusModel = await SyllabusModelConverter(syllabus);
  // req.syllabusModel = syllabusModel;
  // req.syllabus = syllabus;
  req.history = history;
  req.course = course;
  next();
});

exports.GetResponse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    data: req.syllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  // const syllabusDepartment = await Syllabus.find({ departmentCode: req.params.id });

  const features = new APIFeatures(
    Syllabus.find({ departmentCode: req.params.id }).populate('user', 'username photo'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const syllabusDepartment = await features.query;

  res.status(200).json({
    status: 200,
    data: syllabusDepartment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {
  // const syllabusUser = await Syllabus.find({ instructorID: req.params.id });

  const features = new APIFeatures(
    Syllabus.find({ instructorID: req.params.id }).populate('user', 'username photo'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const syllabusUser = await features.query;
  res.status(200).json({
    status: 200,
    data: syllabusUser,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.GetAllByCourse = catchAsync(async (req, res, next) => {
  // const syllabusCourse = await Syllabus.findOne({ course: req.params.id }).populate('course');

  // let syllabusObject = await SyllabusModelConverter(syllabusCourse);

  const histories = await History.findOne({ course: req.params.id }, null, { lean: 'toObject' })
    .populate('course')
    .populate({ path: 'course', populate: { path: 'department' } })
    .populate('syllabuses')
    .populate({ path: 'syllabuses', populate: { path: 'author' } })
    .populate({ path: 'syllabuses', populate: { path: 'validator' } })
    .populate({ path: 'course', populate: { path: 'preCourse' } })
    .populate({ path: 'course', populate: { path: 'prerequisiteCourse' } })

    .populate('validator');

  if (histories) {
    histories.syllabuses.sort((a, b) => a.updatedDate - b.updatedDate);
  }
  console.log(histories);
  res.status(200).json({
    status: 200,
    // data: syllabusObject,
    data: histories,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  // const syllabusses = await Syllabus.find({}).populate('course').populate('author');
  const histories = await History.find({}, null, { lean: 'toObject' })
    .populate('course')
    .populate('syllabuses')
    .populate({ path: 'syllabuses', populate: { path: 'author' } })
    .populate({ path: 'syllabuses', populate: { path: 'validator' } })
    .populate({ path: 'course', populate: { path: 'preCourse' } })
    .populate({ path: 'course', populate: { path: 'prerequisiteCourse' } })
    .populate('validator');

  for (let i = 0; i < histories.length - 1; i++) {
    histories[i].syllabuses.sort((a, b) => a.updatedDate - b.updatedDate);
  }

  res.status(200).json({
    status: 200,
    data: histories,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Update = catchAsync(async (req, res, next) => {
  // const updatedSyllabus = await req.syllabus.updateOne({ ...req.body, approved: false });
  let syllabusObject = await SyllabusBodyConverter(req);
  // const history = await createHistoryChain(req);

  const syllabusCopy = await Syllabus.create({
    ...syllabusObject,
    author: req.user,
    course: req.course,
  });
  const history = req.history;
  history.syllabuses.push(syllabusCopy);
  history.save();

  //Logger
  await loggerAPI.LoggerDB(req, req.user.username + ' đã thêm mới đề cương mới cho môn ' + req.course.courseNameVN);
  res.status(200).json({
    status: 'success create new syllabus version',
    data: { syllabus: syllabusCopy, history },
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  await History.deleteMany({ syllabus: req.syllabus._id });
  await req.syllabus.deleteOne();

  res.status(200).json({
    status: 'success delete syllabus',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.SubmitSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.instructorSignature = req.user.identifyNumber;
  req.syllabus.approved = false;
  await req.syllabus.save();
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.ApproveSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.validated = true;
  req.syllabus.validateDate = new Date();
  req.syllabus.validator = req.user._id;
  req.syllabus.updatedDate = new Date();
  req.syllabus.status = SyllabusValidateStatus.Verified;

  //Logger
  await loggerAPI.LoggerDB(req, req.user.username + ' đã xét duyệt đề cương môn ' + req.syllabus.course.courseNameVN);
  await req.syllabus.save();
  res.status(200).json({
    status: 200,
    message: 'success approve',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RequestReview = catchAsync(async (req, res, next) => {
  req.syllabus.instructorSignature = req.user.identifyNumber;
  await req.syllabus.save();
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RejectSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.validated = false;
  req.syllabus.validator = req.user._id;
  req.syllabus.updatedDate = new Date();
  req.syllabus.status = SyllabusValidateStatus.Rejected;

  //Logger
  await loggerAPI.LoggerDB(
    req,
    req.user.username + ' đã từ chối xét duyệt đề cương ' + req.syllabus.course.courseNameVN
  );
  await req.syllabus.save();
  res.status(200).json({
    status: 200,
    message: 'success reject',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetSyllabusHitory = catchAsync(async (req, res, next) => {
  const history = await syllabusAPI.GetHistoryChain(req.syllabus);
  res.status(200).json({
    status: 200,
    data: history,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.GetSyllabusMainHitory = catchAsync(async (req, res, next) => {
  const history = await syllabusAPI.GetMainHistoryChain(req.syllabus);
  res.status(200).json({
    status: 200,
    data: history,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
