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

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const syllabusAPI = require('../modules/syllabusAPI');
const courseOutcomeModel = require('./CourseOutcomeModel');
const courseAssessElementDetailModel = require('./CourseAssessElementDetailModel');
const courseScheduleModel = require('./CourseScheduleModel');
const CourseAssessElement = require('../models/mongo/CourseAssessElement');

class SyllabusModel {
  constructor(body) {
    // if (body) {
    //   console.log(body);
    //   this.course = body.course || '';
    //   this.courseOutcomes = body.courseOutcomes || [];
    //   for (let i = 0; i < this.courseOutcomes.length; i++) {
    //     this.courseOutcomes[i] = courseOutcomeModel.CourseOutcomeBodyConverter(this.courseOutcomes[i]);
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
    let object = { ...body };
    try {
      if (body) {
        // object.course = body.course || '';
        object.course = await Course.findOne({ _id: body.course });
        object.courseOutcomes = body.courseOutcomes || [];
        for (let i = 0; i < object.courseOutcomes.length; i++) {
          // object.courseOutcomes[i] = await courseOutcomeModel.CourseOutcomeBodyConverter(object.courseOutcomes[i]);
          object.courseOutcomes[i] = await Outcome.findById(object.courseOutcomes[i]._id);
        }
        object.courseAssessments = body.courseAssessments || [];
        for (let i = 0; i < object.courseAssessments.length; i++) {
          // object.courseAssessments[i] = await courseAssessElementDetailModel.CourseAssessElementDetailBodyConverter(
          //   object.courseAssessments[i]
          // );
          object.courseAssessments[i].courseAssessment = await CourseAssessElement.findById(
            object.courseAssessments[i].courseAssessment._id
          );
          object.courseAssessments[i].percentage = body.courseAssessments[i].percentage;
        }
        object.courseSchedules = body.courseSchedules || [];
        for (let i = 0; i < object.courseSchedules.length; i++) {
          object.courseSchedules[i] = await courseScheduleModel.CourseScheduleBodyConverter(object.courseSchedules[i]);
        }
      }
    } catch (error) {
      console.log('SyllabusModel');
      console.log(error);
    }

    return object;
  }

  async modelize(syllabus) {
    let object = { ...syllabus };
    if (syllabus) {
      object._id = syllabus._id;
      object.course = syllabus.course;
      // console.log(syllabus.courseOutcomes);

      object.courseOutcomes = syllabus.courseOutcomes;
      for (let i = 0; i < object.courseOutcomes.length; i++) {
        object.courseOutcomes[i] = await courseOutcomeModel.CourseOutcomeModelConverter(object.courseOutcomes[i]);
      }
      object.courseAssessments = syllabus.courseAssessments || [];
      for (let i = 0; i < object.courseAssessments.length; i++) {
        object.courseAssessments[i] = await courseAssessElementDetailModel.CourseAssessElementDetailModelConverter(
          object.courseAssessments[i]
        );
      }
      object.courseSchedules = syllabus.courseSchedules || [];
      for (let i = 0; i < object.courseSchedules.length; i++) {
        object.courseSchedules[i] = await courseScheduleModel.CourseScheduleBodyConverter(object.courseSchedules[i]);
      }

      object.mainHistory = syllabus.mainHistory;
    }

    return object;
  }

  async modelizeArray(syllabuses) {
    let objects = [];

    return objects;
  }
}

module.exports.SyllabusBodyConverter = async (req) => {
  let model = new SyllabusModel();
  let object = await model.initialize(req.body);
  // object.course = await Course.findOne({ _id: req.body.course });
  return object;
};

module.exports.SyllabusModelConverter = async (syllabus) => {
  const model = new SyllabusModel();
  let object = await model.modelize(syllabus);
  return object;
};

module.exports.SyllabusArrayModelConverter = async (syllabuses) => {
  const model = new SyllabusModel();
  let object = await model.modelizeArray(syllabuses);
  return object;
};
