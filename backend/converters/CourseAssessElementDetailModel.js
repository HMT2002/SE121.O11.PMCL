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
const CourseAssessElement = require('../models/mongo/CourseAssessElement');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');
const { AcademicPerformance } = require('../constants/AcademicPerformance');
const courseAssessmentElementRubricModel = require('./CourseAssessmentElementRubricModel');

class CourseAssessElementDetailModel {
  constructor(body) {
    // if (body) {
    //   this.assessElement = body.assessElement || null;
    //   this.assessLevel = body.assessLevel || 0;
    //   this.description = body.description || '';
    //   this.courseOutcomes = body.courseOutcomes || [];
    //   this.percentage = body.courseOutcomes || 0;
    //   this.rubrics = body.rubrics || [];
    // }
  }
  async initialize(body) {
    let object = {};
    try {
      if (body) {
        object.assessElement = body.assessElement || '';
        object.assessLevel = body.assessLevel || 0;
        object.description = body.description || '';
        object.courseOutcomes = body.courseOutcomes || [];
        object.percentage = body.percentage || 0;
        object.rubrics = body.rubrics || [];
        for (let i = 0; i < object.rubrics.length; i++) {
          object.rubrics[i] = await courseAssessmentElementRubricModel.CourseAssessmentElementRubricBodyConverter(
            object.rubrics[i]
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
        object.assessElement = body.assessElement || '';
        object.assessLevel = body.assessLevel || 0;
        object.description = body.description || '';
        object.courseOutcomes = body.courseOutcomes || [];
        object.percentage = body.percentage || 0;
        object.rubrics = body.rubrics || [];
        for (let i = 0; i < object.rubrics.length; i++) {
          object.rubrics[i] = await courseAssessmentElementRubricModel.CourseAssessmentElementRubricModelConverter(
            object.rubrics[i]
          );
        }
      }
    } catch (error) {}

    return object;
  }
}

module.exports.CourseAssessElementDetailBodyConverter = async (body) => {
  let model = new CourseAssessElementDetailModel();
  let object = await model.initialize(body);
  // object.assessElement = await CourseAssessElement.findOne({ _id: object.assessElement });
  // object.rubrics.forEach(async (id) => {
  //     // const output = await Output.findOne({ _id: id });
  //     // id = output;
  //   });
  // object.courseOutcomes.forEach(async (id) => {
  //     // const output = await Output.findOne({ _id: id });
  //     // id = output;
  //   });
  return object;
};

module.exports.CourseAssessElementDetailModelConverter = async (body) => {
  const model = new CourseAssessElementDetailModel();
  let object = await model.modelize(body);
  object.assessElement = await CourseAssessElement.findById(object.assessElement);
  return object;
};
