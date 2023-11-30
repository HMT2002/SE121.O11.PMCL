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

class CourseGoalModel  {
    constructor(body) {
        if(body){
            this.description=body.description||''
            this.programOutcomes=body.programOutcomes||[]
            this.maxScore=body.maxScore||0
            this.requirement=body.requirement||''
        }
    }
    modelize(course){

    }
  }
    
  module.exports.CourseGoalBodyConverter = async(req)=>{
    const object=new CourseGoalModel(req.body);

    return object;
}

module.exports.CourseGoalModelConverter =(course)=>{
    const object=new CourseGoalModel();
    object.modelize(course)
    return object;
}