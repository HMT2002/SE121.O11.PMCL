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

const imgurAPI = require('./imgurAPI');
const mailingAPI = require('./mailingAPI');
const historyAPI = require('./historyAPI');

const moment = require('moment');



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

  //req.headers.branch=true
  //not the first history
  if (req.headers.branch && syllabusHitory !== null) {
    const branchSyllabus = await Syllabus.findOne({ _id: req.syllabus._id }).populate('mainHistory');
    syllabusHitory = branchSyllabus.mainHistory.prevHistory;
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
    oldValue,
  });
  if (req.headers.main) {
    req.syllabus.mainHistory = history;
    await req.syllabus.save();
  }
};

exports.GetHistoryChain=async(syllabus)=>{
    return await getHistoryChain(syllabus);
}

exports.GetMainHistoryChain=async(syllabus)=>{
    return await getMainHistoryChain(syllabus);
}

const getHistoryChain = async (syllabus) => {
  const historyChain = await History.find({ syllabus: syllabus._id }).sort({ createdDate: -1 });
  return historyChain;
};

const getMainHistoryChain = async (syllabus) => {
  const history = await History.findOne({ _id: syllabus.mainHistory }).populate('prevHistory').lean();
  const historyChain= await historyAPI.GetHistoryPrevHistory(history);
  return historyChain;
};

