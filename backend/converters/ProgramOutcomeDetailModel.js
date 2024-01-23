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
const ProgramOutcome = require('../models/mongo/ProgramOutcome');
const ProgramOutcomeAssertment = require('../models/mongo/ProgramOutcomeAssertment');

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
    //   object.programOutcome = body.programOutcome || null;
    //   object.outcomeLevel = body.outcomeLevel || 0;
    //   object.outcomeAssessment = body.outcomeAssessment || null;
    //   object.assessmentLevel = body.assessmentLevel || 0;
    //   object.description = body.description || '';
    // }
  }
  async initialize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.programOutcome = body.programOutcome || '';
        object.outcomeLevel = body.outcomeLevel || 0;
        object.outcomeAssessment = body.outcomeAssessment || '';
        object.assessmentLevel = body.assessmentLevel || 0;
        object.description = body.description || '';
      }
    } catch (error) {
      console.log(error);
    }

    return object;
  }
  async modelize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.programOutcome = body.programOutcome || '';
        object.outcomeLevel = body.outcomeLevel || 0;
        object.outcomeAssessment = body.outcomeAssessment || '';
        object.assessmentLevel = body.assessmentLevel || 0;
        object.description = body.description || '';
      }
    } catch (error) {
      console.log(error);
    }

    return object;
  }
}

module.exports.ProgramOutcomeDetailBodyConverter = async (body) => {
  const model = new ProgramOutcomeDetailModel();
  let object = await model.initialize(body);
  return object;
};

module.exports.ProgramOutcomeDetailModelConverter = async (body) => {
  const model = new ProgramOutcomeDetailModel();
  let object = await model.modelize(body);
  object.programOutcome = await ProgramOutcome.findById(object.programOutcome);
  object.outcomeAssessment = await ProgramOutcomeAssertment.findById(object.outcomeAssessment);

  return object;
};
