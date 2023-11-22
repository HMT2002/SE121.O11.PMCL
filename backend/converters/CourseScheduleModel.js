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

class CourseScheduleModel  {
    constructor(body) {
        if(body){
            this.class=body.class||1
            this.description=body.description||''
            this.courseOutcomes=body.courseOutcomes||[]
            this.activities=body.activities||''
            this.courseAssessElements=body.courseAssessElements||[]

        }
    }
    modelize(course){

    }
  }
    
  module.exports.CourseScheduleBodyConverter = async(req)=>{
    const object=new CourseScheduleModel(req.body);

    return object;
}

module.exports.CourseScheduleModelConverter =(course)=>{
    const object=new CourseScheduleModel();
    object.modelize(course)
    return object;
}