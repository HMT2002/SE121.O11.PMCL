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
    if (body) {
      this.courseGoal = courseGoalModel.CourseGoalBodyConverter(body.courseGoal);
      this.level = body.level || 0;
      this.description = body.description || '';
      this.levelOfTeaching = body.levelOfTeaching || '';
    }
  }
  modelize(body) {
    this.courseGoal = courseGoalModel.CourseGoalBodyConverter(body.courseGoal);
    this.level = body.level;
    this.description = body.description;
    this.levelOfTeaching = body.levelOfTeaching;
  }
}

module.exports.CourseOutcomeBodyConverter = async (body) => {
  const object = new CourseOutcomeModel(body);
  //   object.levelOfTeaching = await LevelOfTeaching.findById(object.levelOfTeaching);
  //   console.log(await LevelOfTeaching.findById(object.levelOfTeaching));
  return null;
};

module.exports.CourseOutcomeModelConverter = (body) => {
  const object = new CourseOutcomeModel();
  object.modelize(body);
  return object;
};
