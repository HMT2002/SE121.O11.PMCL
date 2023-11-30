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

class SyllabusModel {
  constructor(body) {
    if (body) {
      this.courseCode = body.courseCode || '';
      this.previousCourseCode = body.previousCourseCode || [];
      this.requireCourseCode = body.requireCourseCode || [];
      this.departmentCode = body.departmentCode || '';
      this.instructorName = body.instructorName || '';
      this.instructorEmail = body.instructorEmail || '';
      this.instructorID = body.instructorID || '';
      this.outputStandard = body.outputStandard || [];
      this.evaluatePart = body.evaluatePart || [];
      this.knowledgeBlock = body.knowledgeBlock || 'Đại cương';
      this.numberOfTheoryCredits = body.numberOfTheoryCredits || 0;
      this.numberOfPracticeCredits = body.numberOfPracticeCredits || 0;
      this.numberOfSelfLearnCredits = body.numberOfSelfLearnCredits || 0;
      this.description = body.description || '';
      this.theoryContent = body.theoryContent || [''];
      this.practiceContent = body.practiceContent || [''];
      this.syllabusRules = body.syllabusRules || '';
      this.syllabusDocuments = body.syllabusDocuments || '';
      this.syllabusTools = body.syllabusTools || '';
      this.approved = body.approved || false;
      this.headMasterSignature = body.headMasterSignature || '';
      this.lectureSignature = body.lectureSignature || '';
    }
  }
  modelize(syllabus) {
    this._id = syllabus._id;
    this.courseCode = syllabus.courseCode;
    this.previousCourseCode = syllabus.previousCourseCode;
    this.requireCourseCode = syllabus.requireCourseCode;
    this.knowledgeBlock = syllabus.knowledgeBlock;
    this.departmentCode = syllabus.departmentCode;
    this.instructorName = syllabus.instructorName;
    this.instructorEmail = syllabus.instructorEmail;
    this.instructorID = syllabus.instructorID;
    this.numberOfTheoryCredits = syllabus.numberOfTheoryCredits;
    this.numberOfPracticeCredits = syllabus.numberOfPracticeCredits;
    this.numberOfSelfLearnCredits = syllabus.numberOfSelfLearnCredits;
    this.description = syllabus.description;
    this.outputStandard = syllabus.outputStandard;
    this.theoryContent = syllabus.theoryContent;
    this.practiceContent = syllabus.practiceContent;
    this.evaluatePart = syllabus.evaluatePart;
    this.syllabusRules = syllabus.syllabusRules;
    this.syllabusDocuments = syllabus.syllabusDocuments;
    this.syllabusTools = syllabus.syllabusTools;
    this.approved = syllabus.approved;
    this.createdDate = syllabus.createdDate;
    this.lastUpdated = syllabus.lastUpdated;
    this.headMasterSignature = syllabus.headMasterSignature;
    this.instructorSignature = syllabus.instructorSignature;
    this.mainHistory = syllabus.mainHistory;
  }
};

module.exports.SyllabusBodyConverter = async(req)=>{
    const syllabusObject=new SyllabusModel(req.body);
    syllabusObject.courseCode = await Course.findOne({ _id: req.body.courseCode });
    syllabusObject.previousCourseCode.forEach(async (code) => {
      const course = await Course.findOne({ _id: code });
      code = course;
    });
    syllabusObject.requireCourseCode.forEach(async (code) => {
      const course = await Course.findOne({ _id: code });
      code = course;
    });
    syllabusObject.departmentCode = await Department.findOne({ _id: req.body.departmentCode });
    syllabusObject.instructorName = req.user.username;
    syllabusObject.instructorEmail = req.user.email;
    syllabusObject.instructorID = req.user._id;
    syllabusObject.outputStandard.forEach(async (id) => {
      const output = await Output.findOne({ _id: id });
      id = output;
    });
    syllabusObject.evaluatePart.forEach(async (id) => {
      const eval = await Evaluate.findOne({ _id: id });
      id = eval;
    });

    return syllabusObject;
}

module.exports.SyllabusModelConverter =(syllabus)=>{
    const syllabusObject=new SyllabusModel();
    syllabusObject.modelize(syllabus)
    return syllabusObject;
}