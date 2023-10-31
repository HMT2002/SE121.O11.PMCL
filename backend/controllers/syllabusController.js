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
const moment = require('moment');

exports.Create = catchAsync(async (req, res, next) => {
  const {
    courseCode,
    previousCourseCode,
    requireCourseCode,
    knowledgeBlock,
    departmentCode,
    lectureName,
    lectureEmail,
    lectureID,
    numberOfTheory,
    numberOfPractice,
    numberOfSelfLearn,
    description,
    outputStandard,
    theoryContent,
    practiceContent,
    evaluatePart,
    syllabusRules,
    syllabusDocuments,
    syllabusTools,
    approved,
    headMasterSignature,
    lectureSignature,
  } = req.body;

  const testSyllabus = await Syllabus.find({ courseCode: courseCode });
  if (testSyllabus.length !== 0) {
    res.status(200).json({
      status: 'unsuccess, alreadey exist course code',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }

  req.body.courseCode = await Course.findOne({ _id: courseCode });

  req.body.previousCourseCode.forEach(async (code) => {
    const course = await Course.findOne({ _id: code });
    code = course;
  });
  req.body.requireCourseCode.forEach(async (code) => {
    const course = await Course.findOne({ _id: code });
    code = course;
  });

  req.body.departmentCode = await Department.findOne({ _id: departmentCode });
  req.body.instructorName = req.user.username;
  req.body.instructorEmail = req.user.email;
  req.body.instructorID = req.user._id;
  req.body.outputStandard.forEach(async (id) => {
    const output = await Output.findOne({ _id: id });
    id = output;
  });
  req.body.evaluatePart.forEach(async (id) => {
    const eval = await Evaluate.findOne({ _id: id });
    id = eval;
  });
  console.log(req.body);
  const syllabus = await Syllabus.create({ ...req.body });

  res.status(200).json({
    status: 'success',
    syllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetID = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const syllabus = await Syllabus.findOne({ _id: id });
  const objname = 'syllabus';
  if (!syllabus) {
    return next(new AppError('Cant find ' + objname + ' with id ' + id, 404));
  }
  req.syllabus = syllabus;
  next();
});

exports.Get = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    syllabus: req.syllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  const syllabusDepartment = await Syllabus.find({ departmentCode: req.params.id });
  res.status(200).json({
    status: 'success',
    syllabusDepartment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByUser = catchAsync(async (req, res, next) => {
  const syllabusUser = await Syllabus.find({ instructorID: req.params.id });
  res.status(200).json({
    status: 'success',
    syllabusUser,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByCourse = catchAsync(async (req, res, next) => {
  const syllabusCourse = await Syllabus.find({ courseCode: req.params.id });

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

const createHistoryChain=async(req)=>{
  const syllabusHitory=await History.find({syllabus:req.syllabus}).sort({'createdDate': -1});
  let prevHistory=null;
  if(syllabusHitory.length!==0){
    prevHistory=syllabusHitory[0];
  }
  const history=await History.create({...req.body,user:req.user,syllabus:req.syllabus,prevHistory});
}

exports.Update = catchAsync(async (req, res, next) => {
  
  const updatedSyllabus=await req.syllabus.updateOne({...req.body});

  createHistoryChain(req);
  res.status(200).json({
    status: 'success update syllabus',
    syllabus: updatedSyllabus,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  await req.syllabus.deleteOne();

  res.status(200).json({
    status: 'success delete syllabus',
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
