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
const Department = require('../models/mongo/Department');
const History = require('../models/mongo/History');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');

const {
  SyllabusBodyConverter,
  SyllabusModelConverter,
  SyllabusArrayModelConverter,
} = require('../converters/SyllabusModel');
const { HistoryBodyConverter, HistoryModelConverter } = require('../converters/HistoryModel');

const moment = require('moment');
const HistoryModel = require('../converters/HistoryModel');
const LevelOfTeaching = require('../models/mongo/LevelOfTeaching');
const ProgramOutcomeAssertment = require('../models/mongo/ProgramOutcomeAssertment');

exports.Create = catchAsync(async (req, res, next) => {
  const programOutcomeAssertment = await ProgramOutcomeAssertment.create({ ...req.body });
  res.status(200).json({
    status: 'success',
    programOutcomeAssertment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const syllabus = await Syllabus.findOne({ _id: id });
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

exports.GetResponse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    syllabus: req.syllabusModel,
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
    status: 'success',
    syllabusDepartment,
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
    status: 'success',
    syllabusUser,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.GetAllByCourse = catchAsync(async (req, res, next) => {
  const syllabusCourse = await Syllabus.findOne({ course: req.params.id }).populate('course');

  console.log(req.params.id);
  console.log(syllabusCourse);
  let syllabusObject = await SyllabusModelConverter(syllabusCourse);

  res.status(200).json({
    status: 'success',
    syllabus: syllabusObject,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  const programOutcomeAssertments = await ProgramOutcomeAssertment.find({});
  res.status(200).json({
    status: 'success',
    programOutcomeAssertments,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

const createHistoryChain = async (req) => {
  // const syllabusHitory = await History.find({ syllabus: req.syllabus }).sort({ createdDate: -1 });
  // let prevHistory = null;
  // if (syllabusHitory.length !== 0) {
  //   if (req.headers.branch === true&&syllabusHitory.length > 1) {
  //     prevHistory = syllabusHitory[0].prevHistory;
  //   } else {
  //     prevHistory = syllabusHitory[0];
  //   }
  // }

  const historyObject = await HistoryBodyConverter(req);

  const history = await History.create(historyObject);
  if (req.headers.main) {
    console.log('main branch');
    req.syllabus.mainHistory = history;
    await req.syllabus.save();
  }

  const historyResult = await History.findById(history._id);
  return historyResult;
};

const getHistoryChain = async (syllabus) => {
  const historyChain = await History.find({ syllabus: syllabus._id }).sort({ createdDate: -1 });
  return historyChain;
};

const getMainHistoryChain = async (syllabus) => {
  const historyChain = await History.find({ syllabus: syllabus._id }).sort({ createdDate: -1 });
  return historyChain;
};

exports.Update = catchAsync(async (req, res, next) => {
  const updatedSyllabus = await req.syllabus.updateOne({ ...req.body, approved: false });
  const history = await createHistoryChain(req);
  req.syllabus = await Syllabus.findById(req.syllabus._id);

  res.status(200).json({
    status: 'success update syllabus',
    syllabus: req.syllabus,
    history,
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
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.ApproveSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.approved === true;
  req.syllabus.headMasterSignature = req.user.identifyNumber;
  await req.syllabus.save();
  res.status(200).json({
    status: 'success approve',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RequestReview = catchAsync(async (req, res, next) => {
  req.syllabus.instructorSignature = req.user.identifyNumber;
  await req.syllabus.save();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.RejectSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.approved === false;
  req.syllabus.headMasterSignature = req.user.identifyNumber;
  await req.syllabus.save();
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetSyllabusHitory = catchAsync(async (req, res, next) => {
  const history = await syllabusAPI.GetHistoryChain(req.syllabus);
  res.status(200).json({
    status: 'success',
    history,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.GetSyllabusMainHitory = catchAsync(async (req, res, next) => {
  const history = await syllabusAPI.GetMainHistoryChain(req.syllabus);
  res.status(200).json({
    status: 'success',
    history,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
