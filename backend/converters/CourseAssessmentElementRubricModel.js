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
const courseAssessElementRubricDetailModel = require('./CourseAssessElementRubricDetailModel');

class CourseAssessmentElementRubricModel {
  constructor(body) {
    // if(body){
    //     this.courseOutcome=body.courseOutcome||[]
    //     this.details=body.details||[]
    // }
  }
  async initialize(body) {
    let object = {};
    try {
      if (body) {
        object.courseOutcome = body.courseOutcome || [];
        object.details = body.details || [];
        for (let i = 0; i < object.details.length; i++) {
          object.details[i] = await courseAssessElementRubricDetailModel.CourseAssessElementRubricDetailBodyConverter(
            object.details[i]
          );
        }
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    let object = {};
    try {
      if (body) {
        object.courseOutcome = body.courseOutcome || [];
        object.details = body.details || [];
        for (let i = 0; i < object.details.length; i++) {
          object.details[i] = await courseAssessElementRubricDetailModel.CourseAssessElementRubricDetailModelConverter(
            object.details[i]
          );
        }
      }
    } catch (error) {}

    return object;
  }
}

module.exports.CourseAssessmentElementRubricBodyConverter = async (req) => {
  let model = new CourseAssessmentElementRubricModel(body);
  let object = await model.initialize(body);
  return object;
};

module.exports.CourseAssessmentElementRubricModelConverter = async (body) => {
  const model = new CourseAssessmentElementRubricModel();
  let object = await model.modelize(body);
  return object;
};
