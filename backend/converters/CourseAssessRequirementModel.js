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

class CourseAssessRequirementModel {
  constructor(body) {
    // if(body){
    //     this.academicPerformance=body.academicPerformance||AcademicPerformance.TrungBinh,
    //     this.minScore=body.minScore||0
    //     this.maxScore=body.maxScore||0
    //     this.requirement=body.requirement||''
    // }
  }
  async initialize(body) {
    let object = {};
    try {
      if (body) {
        (this.academicPerformance = body.academicPerformance || AcademicPerformance.TrungBinh),
          (this.minScore = body.minScore || 0);
        this.maxScore = body.maxScore || 0;
        this.requirement = body.requirement || '';
      }
    } catch (error) {}

    return object;
  }
  async modelize(body) {
    let object = {};
    try {
      if (body) {
        (this.academicPerformance = body.academicPerformance || AcademicPerformance.TrungBinh),
          (this.minScore = body.minScore || 0);
        this.maxScore = body.maxScore || 0;
        this.requirement = body.requirement || '';
      }
    } catch (error) {}

    return object;
  }
}

module.exports.CourseAssessRequirementBodyConverter = async (req) => {
  let model = new CourseAssessRequirementModel(body);
  let object = await model.initialize(body);
  return object;
};

module.exports.CourseAssessRequirementModelConverter = async (body) => {
  const model = new CourseAssessRequirementModel();
  let object = await model.modelize(body);
  return object;
};
