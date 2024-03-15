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
const courseAssessRequirementModel = require('./CourseAssessRequirementModel');

class CourseAssessElementRubricDetailModel {
  constructor(body) {
    // if(body){
    //     this.level=body.level||1;
    //     this.requirements=body.requirements||[]
    // }
  }

  async initialize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.level = body.level || 1;
        object.requirements = body.requirements || [];
        for (let i = 0; i < object.requirements.length; i++) {
          object.requirements[i] = await courseAssessRequirementModel.CourseAssessRequirementBodyConverter(
            object.requirements[i]
          );
        }
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.level = body.level || 1;
        object.requirements = body.requirements || [];
        for (let i = 0; i < object.requirements.length; i++) {
          object.requirements[i] = await courseAssessRequirementModel.CourseAssessRequirementModelConverter(
            object.requirements[i]
          );
        }
      }
    } catch (error) {}

    return object;
  }
}

module.exports.CourseAssessElementRubricDetailBodyConverter = async (req) => {
  let model = new CourseAssessElementRubricDetailModel(body);
  let object = await model.initialize(body);
  return object;
};

module.exports.CourseAssessElementRubricDetailModelConverter = async (body) => {
  const model = new CourseAssessElementRubricDetailModel();
  let object = await model.modelize(body);
  return object;
};
