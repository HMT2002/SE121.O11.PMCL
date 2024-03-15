const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const CourseOutcome = require('../models/mongo/CourseOutcome');
const Department = require('../models/mongo/Department');
const History = require('../models/mongo/History');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');
const { AcademicPerformance } = require('../constants/AcademicPerformance');
const programOutcomesDetailModel = require('./ProgramOutcomeDetailModel');
class CourseGoalModel {
  constructor(body) {
    // if (body) {
    //   this.description = body.description || '';
    //   this.programOutcomes = body.programOutcomes || [];
    //   for (let i = 0; i < this.programOutcomes.length; i++) {
    //     this.programOutcomes[i] =await programOutcomesDetailModel.ProgramOutcomeDetailBodyConverter(this.programOutcomes[i]);
    //   }
    //   this.maxScore = body.maxScore || 0;
    //   this.requirement = body.requirement || '';
    // }
  }
  async initialize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.description = body.description || '';
        object.programOutcomes = body.programOutcomes || [];
        for (let i = 0; i < object.programOutcomes.length; i++) {
          object.programOutcomes[i] = await programOutcomesDetailModel.ProgramOutcomeDetailBodyConverter(
            object.programOutcomes[i]
          );
        }

        object.maxScore = body.maxScore || 0;
        object.requirement = body.requirement || '';
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.description = body.description || '';
        object.programOutcomes = body.programOutcomes || [];
        for (let i = 0; i < object.programOutcomes.length; i++) {
          object.programOutcomes[i] = await programOutcomesDetailModel.ProgramOutcomeDetailModelConverter(
            object.programOutcomes[i]
          );
        }

        object.maxScore = body.maxScore || 0;
        object.requirement = body.requirement || '';
      }
    } catch (error) {}

    return object;
  }
}

module.exports.CourseGoalBodyConverter = async (body) => {
  const model = new CourseGoalModel();
  let object = await model.initialize(body);
  return object;
};

module.exports.CourseGoalModelConverter = async (body) => {
  const model = new CourseGoalModel();
  let object = await model.modelize(body);

  return object;
};
