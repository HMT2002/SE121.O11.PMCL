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

const SyllabusModel = require('../converter/SyllabusModel');


const moment = require('moment');
const HistoryModel = require('../converter/HistoryModel');

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


  let syllabusModel =await new SyllabusModel(req.body);

  const testSyllabus = await Syllabus.find({ courseCode: courseCode });
  if (testSyllabus.length !== 0) {
    res.status(200).json({
      status: 'unsuccess, alreadey exist course code',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  syllabusModel.courseCode = await Course.findOne({ _id: courseCode });
  syllabusModel.previousCourseCode.forEach(async (code) => {
    const course = await Course.findOne({ _id: code });
    code = course;
  });
  syllabusModel.requireCourseCode.forEach(async (code) => {
    const course = await Course.findOne({ _id: code });
    code = course;
  });
  syllabusModel.departmentCode = await Department.findOne({ _id: departmentCode });
  syllabusModel.instructorName = req.user.username;
  syllabusModel.instructorEmail = req.user.email;
  syllabusModel.instructorID = req.user._id;
  syllabusModel.outputStandard.forEach(async (id) => {
    const output = await Output.findOne({ _id: id });
    id = output;
  });
  syllabusModel.evaluatePart.forEach(async (id) => {
    const eval = await Evaluate.findOne({ _id: id });
    id = eval;
  });
  
  const syllabus = await Syllabus.create({ ...syllabusModel });

  res.status(200).json({
    status: 'success',
    syllabus,
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
  let syllabusModel =new SyllabusModel();
  syllabusModel.modelize(syllabus)
  req.syllabusModel=syllabusModel;

  req.syllabus = syllabus;
  next();
});

exports.GetResponse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    syllabus: req.syllabus,
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

  const oldValue = {
    previousCourseCode: req.syllabus.previousCourseCode,
    requireCourseCode: req.syllabus.requireCourseCode,
    knowledgeBlock: req.syllabus.knowledgeBlock,
    departmentCode: req.syllabus.departmentCode,
    numberOfTheoryCredits: req.syllabus.numberOfTheoryCredits,
    numberOfPracticeCredits: req.syllabus.numberOfPracticeCredits,
    numberOfSelfLearnCredits: req.syllabus.numberOfSelfLearnCredits,
    description: req.syllabus.description,
    outputStandard: req.syllabus.outputStandard,
    theoryContent: req.syllabus.theoryContent,
    practiceContent: req.syllabus.practiceContent,
    evaluatePart: req.syllabus.evaluatePart,
    syllabusRules: req.syllabus.syllabusRules,
    syllabusDocuments: req.syllabus.syllabusDocuments,
    syllabusTools: req.syllabus.syllabusTools,
    lectureSignature: req.syllabus.lectureSignature,
  };

  const newValue = {
    previousCourseCode: req.body.previousCourseCode,
    requireCourseCode: req.body.requireCourseCode,
    knowledgeBlock: req.body.knowledgeBlock,
    departmentCode: req.body.departmentCode,
    numberOfTheoryCredits: req.body.numberOfTheoryCredits,
    numberOfPracticeCredits: req.body.numberOfPracticeCredits,
    numberOfSelfLearnCredits: req.body.numberOfSelfLearnCredits,
    description: req.body.description,
    outputStandard: req.body.outputStandard,
    theoryContent: req.body.theoryContent,
    practiceContent: req.body.practiceContent,
    evaluatePart: req.body.evaluatePart,
    syllabusRules: req.body.syllabusRules,
    syllabusDocuments: req.body.syllabusDocuments,
    syllabusTools: req.body.syllabusTools,
    lectureSignature: req.body.lectureSignature,
  };

  let syllabusHitory = req.syllabus.mainHistory;

  console.log('req.syllabus.mainHistory is ');
  console.log(syllabusHitory)
  //req.headers.branch=true
  //not the first history
  if (req.headers.branch && syllabusHitory !== null) {
    console.log('req.headers.branch && syllabusHitory !== null')
    const branchSyllabus = await Syllabus.findOne({ _id: req.syllabus._id }).populate('mainHistory');
    syllabusHitory = branchSyllabus.mainHistory.prevHistory;
    console.log(syllabusHitory)

  }

  //req.headers.branch=true
  //not the first history
  //req.body.branchedHistoryID in the body
  if (req.headers.branch && syllabusHitory !== null && req.body.branchedHistoryID) {
    const branchedHistory = await History.findOne({ _id: req.body.branchedHistoryID });
    syllabusHitory = branchedHistory;
  }

  const history = await History.create({
    ...req.body,
    user: req.user,
    syllabus: req.syllabus,
    prevHistory: syllabusHitory,
    newValue,
  });
  if (req.headers.main) {
    console.log('main branch')
    req.syllabus.mainHistory = history;
    await req.syllabus.save();
  }

  const historyResult=await History.findById(history._id);
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
  const history= await createHistoryChain(req);
  req.syllabus=await Syllabus.findById(req.syllabus._id);

  res.status(200).json({
    status: 'success update syllabus',
    syllabus: req.syllabus,
    history,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {

  await History.deleteMany({syllabus:req.syllabus._id})
  await req.syllabus.deleteOne();

  res.status(200).json({
    status: 'success delete syllabus',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.SubmitSyllabus = catchAsync(async (req, res, next) => {
  req.syllabus.instructorSignature = req.user.identifyNumber;
  req.syllabus.approved=false;
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
