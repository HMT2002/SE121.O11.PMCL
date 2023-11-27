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
const { AcademicPerformance } = require('../constants/AcademicPerformance');

class ProgramOutcomeDetailModel {
  constructor(body) {
    // if (body) {
    //   this.programOutcome = body.programOutcome || null;
    //   this.outcomeLevel = body.outcomeLevel || 0;
    //   this.outcomeAssessment = body.outcomeAssessment || null;
    //   this.assessmentLevel = body.assessmentLevel || 0;
    //   this.description = body.description || '';
    // }
  }
  async initialize(body) {
    let object = {};
    if (body) {
      this.programOutcome = body.programOutcome || null;
      this.outcomeLevel = body.outcomeLevel || 0;
      this.outcomeAssessment = body.outcomeAssessment || null;
      this.assessmentLevel = body.assessmentLevel || 0;
      this.description = body.description || '';
    }
    return object;
  }
  async modelize(course) {}
}

module.exports.ProgramOutcomeDetailBodyConverter = async (body) => {
  const model = new ProgramOutcomeDetailModel();
  let object = await model.initialize(body);
  return object;
};

module.exports.ProgramOutcomeDetailModelConverter = (course) => {
  const object = new ProgramOutcomeDetailModel();
  object.modelize(course);
  return object;
};
