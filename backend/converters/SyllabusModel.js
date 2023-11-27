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
    if (body) {
      console.log(body);
      this.course = body.course || '';
      this.courseOutComes = body.courseOutcomes || [];
      for (let i = 0; i < this.courseOutComes.length; i++) {
        this.courseOutComes[i] = courseOutcomeModel.CourseOutcomeBodyConverter(this.courseOutComes[i]);
      }
      this.courseAssessments = body.courseAssessments || [];
      for (let i = 0; i < this.courseAssessments.length; i++) {
        this.courseAssessments[i] = courseAssessElementDetailModel.CourseAssessElementDetailBodyConverter(
          this.courseAssessments[i]
        );
      }
      this.courseSchedules = body.courseSchedules || [];
      for (let i = 0; i < this.courseSchedules.length; i++) {
        this.courseSchedules[i] = courseScheduleModel.CourseScheduleBodyConverter(this.courseSchedules[i]);
      }
    }
  }
  modelize(syllabus) {
    this._id = syllabus._id;
    this.course = syllabus.course;
    this.courseOutComes = syllabus.courseOutCome;
    this.courseAssessments = syllabus.courseOutCome;
    this.courseSchedules = syllabus.courseSchedules;
    this.mainHistory = syllabus.mainHistory;
  }
}

module.exports.SyllabusBodyConverter = async (req) => {
  const syllabusObject = new SyllabusModel(req.body);
  // syllabusObject.course = await Course.findOne({ _id: req.body.course });

  return syllabusObject;
};

module.exports.SyllabusModelConverter = (syllabus) => {
  const syllabusObject = new SyllabusModel();
  syllabusObject.modelize(syllabus);
  return syllabusObject;
};
