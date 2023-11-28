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
const courseGoalModel = require('./CourseGoalModel');
const LevelOfTeaching = require('../models/mongo/LevelOfTeaching');
class CourseOutcomeModel {
  constructor(body) {
    // if (body) {
    //   this.courseGoal =await courseGoalModel.CourseGoalBodyConverter(body.courseGoal);
    //   this.level = body.level || 0;
    //   this.description = body.description || '';
    //   this.levelOfTeaching = body.levelOfTeaching || '';
    // }
  }
  async initialize(body) {
    let object = {};
    try {
      if (body) {
        object.courseGoal = body.courseGoal || null;
        object.courseGoal = await courseGoalModel.CourseGoalBodyConverter(body.courseGoal);
        object.level = body.level || 0;
        object.description = body.description || '';
        object.levelOfTeaching = body.levelOfTeaching || '';
        return object;
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    let object = {};
    object.courseGoal = await courseGoalModel.CourseGoalBodyConverter(body.courseGoal);
    object.level = body.level;
    object.description = body.description;
    object.levelOfTeaching = body.levelOfTeaching;
    return object;
  }
}

module.exports.CourseOutcomeBodyConverter = async (body) => {
  let model = new CourseOutcomeModel(body);
  let object = await model.initialize(body);
  console.log('###################');
  console.log(object);
  // try {
  //   object.levelOfTeaching = await LevelOfTeaching.findOne({ _id: object.levelOfTeaching });
  // } catch {}
  return object;
};

module.exports.CourseOutcomeModelConverter = (body) => {
  const object = new CourseOutcomeModel();
  object.modelize(body);
  return object;
};
