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

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');

class HistoryModel {
  constructor(req) {
    if (req) {
      const modifiedValue = {
        previousCourseCode: req.body.previousCourseCode,
        requireCourseCode: req.body.requireCourseCode,
        knowledgeBlock: req.body.knowledgeBlock,
        departmentCode: req.body.departmentCode,
        numberOfTheoryCredits: req.body.numberOfTheoryCredits,
        numberOfPracticeCredits: req.body.numberOfPracticeCredits,
        numberOfSelfLearnCredits: req.body.numberOfSelfLearnCredits,
        description: req.body.description,
        courseOutcomes: req.body.courseOutcomes,
        theoryContent: req.body.theoryContent,
        practiceContent: req.body.practiceContent,
        evaluatePart: req.body.evaluatePart,
        syllabusRules: req.body.syllabusRules,
        syllabusDocuments: req.body.syllabusDocuments,
        syllabusTools: req.body.syllabusTools,
        lectureSignature: req.body.lectureSignature,
      };

      this.modifiedValue = modifiedValue;
    }
  }
  modelize(history) {
    this._id = history._id;
    this.field = history.field;
    this.note = history.note;
    this.oldValue = history.oldValue;
    this.modifiedValue = history.modifiedValue;
    this.createdDate = history.createdDate;
    this.user = history.user;
    this.syllabus = history.syllabus;
    this.prevHistory = history.prevHistory;
    this.approved = history.approved;
    this.approveDate = history.approveDate;
    this.headMasterSignature = history.headMasterSignature;
    this.instructorSignature = history.instructorSignature;
  }
}

module.exports.HistoryBodyConverter = async (req) => {
  // const syllabusHitory = await History.find({ syllabus: req.syllabus }).sort({ createdDate: -1 });
  // let prevHistory = null;
  // if (syllabusHitory.length !== 0) {
  //   if (req.headers.branch === true&&syllabusHitory.length > 1) {
  //     prevHistory = syllabusHitory[0].prevHistory;
  //   } else {
  //     prevHistory = syllabusHitory[0];
  //   }
  // }

  const modifiedValue = { ...req.body };

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

  const historyObject = {
    field: req.body.field,
    note: req.body.note,
    field: req.body.field,
    validator: req.user,
    author: req.user,

    syllabus: req.syllabus,
    prevHistory: syllabusHitory,
    modifiedValue,
  };
  return historyObject;
};

module.exports.HistoryModelConverter = (history) => {
  const historyObject = new HistoryModel();
  historyObject.modelize(history);
  return historyObject;
};
