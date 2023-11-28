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
const courseOutcomeModel = require('./CourseOutcomeModel');
const courseAssessElementDetailModel = require('./CourseAssessElementDetailModel');
const courseScheduleModel = require('./CourseScheduleModel');

class SyllabusModel {
  constructor(body) {
    // if (body) {
    //   console.log(body);
    //   this.course = body.course || '';
    //   this.courseOutComes = body.courseOutcomes || [];
    //   for (let i = 0; i < this.courseOutComes.length; i++) {
    //     this.courseOutComes[i] = courseOutcomeModel.CourseOutcomeBodyConverter(this.courseOutComes[i]);
    //   }
    //   this.courseAssessments = body.courseAssessments || [];
    //   for (let i = 0; i < this.courseAssessments.length; i++) {
    //     this.courseAssessments[i] = courseAssessElementDetailModel.CourseAssessElementDetailBodyConverter(
    //       this.courseAssessments[i]
    //     );
    //   }
    //   this.courseSchedules = body.courseSchedules || [];
    //   for (let i = 0; i < this.courseSchedules.length; i++) {
    //     this.courseSchedules[i] = courseScheduleModel.CourseScheduleBodyConverter(this.courseSchedules[i]);
    //   }
    // }
  }

  async initialize(body) {
    let object = {};
    try {
      if (body) {
        object.course = body.course || '';
        object.courseOutcomes = body.courseOutcomes || [];
        for (let i = 0; i < object.courseOutcomes.length; i++) {
          object.courseOutcomes[i] = await courseOutcomeModel.CourseOutcomeBodyConverter(object.courseOutcomes[i]);
        }
        object.courseAssessments = body.courseAssessments || [];
        for (let i = 0; i < object.courseAssessments.length; i++) {
          object.courseAssessments[i] = await courseAssessElementDetailModel.CourseAssessElementDetailBodyConverter(
            object.courseAssessments[i]
          );
        }
        object.courseSchedules = body.courseSchedules || [];
        for (let i = 0; i < object.courseSchedules.length; i++) {
          object.courseSchedules[i] = await courseScheduleModel.CourseScheduleBodyConverter(object.courseSchedules[i]);
        }
      }
    } catch (error) {}

    return object;
  }

  async modelize(init) {
    let object = {};
    object._id = init._id;
    object.course = init.course;
    object.courseOutComes = init.courseOutCome;
    object.courseAssessments = init.courseOutCome;
    object.courseSchedules = init.courseSchedules;
    object.mainHistory = init.mainHistory;
    return object;
  }
}

module.exports.SyllabusBodyConverter = async (req) => {
  let model = new SyllabusModel();
  let object = await model.initialize(req.body);
  // object.course = await Course.findOne({ _id: req.body.course });
  return object;
};

module.exports.SyllabusModelConverter = (syllabus) => {
  const object = new SyllabusModel();
  object.modelize(syllabus);
  return object;
};
