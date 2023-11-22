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

class CourseAssessRequirementModel  {
    constructor(body) {
        if(body){
            this.academicPerformance=body.academicPerformance||AcademicPerformance.TrungBinh,
            this.minScore=body.minScore||0
            this.maxScore=body.maxScore||0
            this.requirement=body.requirement||''
        }
    }
    modelize(course){

    }
  }
    
  module.exports.CourseAssessRequirementBodyConverter = async(req)=>{
    const object=new CourseAssessRequirementModel(req.body);

    return object;
}

module.exports.CourseAssessRequirementModelConverter =(course)=>{
    const object=new CourseAssessRequirementModel();
    object.modelize(course)
    return object;
}