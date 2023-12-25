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
const courseOutcomeModel = require('./CourseOutcomeModel');

class CourseScheduleModel {
  constructor(body) {
    // if (body) {
    //   object.class = body.class || 0;
    //   object.description = body.description || '';
    //   object.courseOutcomes = body.courseOutcomes || [];
    //   for (let i = 0; i < body.courseOutcomes.length; i++) {
    //     object.courseOutcomes[i] = courseOutcomeModel.CourseOutcomeBodyConverter(object.courseOutcomes[i]);
    //   }
    //   object.activities = body.activities || '';
    //   object.courseAssessElements = body.courseAssessElements || [];
    // }
  }

  async initialize(body) {
    let object = { ...body };
    try {
      if (body) {
        object.class = body.class || 0;
        object.description = body.description || '';
        object.courseOutcomes = body.courseOutcomes || [];
        for (let i = 0; i < object.courseOutcomes.length; i++) {
          object.courseOutcomes[i] = await courseOutcomeModel.CourseOutcomeBodyConverter(object.courseOutcomes[i]);
        }
        object.activities = body.activities || '';
        object.courseAssessElements = body.courseAssessElements || [];
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    object.class = body.class;
    object.description = body.description;
    object.courseOutcomes = body.courseOutcomes;
    for (let i = 0; i < object.courseOutcomes.length; i++) {
      object.courseOutcomes[i] = courseOutcomeModel.CourseOutcomeBodyConverter(object.courseOutcomes[i]);
    }
    object.activities = body.activities;
    object.courseAssessElements = body.courseAssessElements;
  }
}

module.exports.CourseScheduleBodyConverter = async (body) => {
  let model = new CourseScheduleModel();
  let object = await model.initialize(body);
  return object;
};

module.exports.CourseScheduleModelConverter = (course) => {
  const object = new CourseScheduleModel();
  object.modelize(course);
  return object;
};
