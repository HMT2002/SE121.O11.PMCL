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

class ContentModel {
  constructor(body) {
    if (body) {
      this.courseCode = body.courseCode || '';
      this.previousCourseCode = body.previousCourseCode || '';
      this.requireCourseCode = body.requireCourseCode || '';
      this.courseNameVN = body.courseNameVN || '';
      this.courseNameEN = body.courseNameEN || '';
      this.instructors = body.instructors || [];
      this.assistants = body.assistants || [];
      this.description = body.description || '';
      this.type = body.type || 'Đại cương';
      this.numberOfTheoryCredits = body.numberOfTheoryCredits || 0;
      this.numberOfPracticeCredits = body.numberOfPracticeCredits || 0;
      this.numberOfSelfLearnCredits = body.numberOfSelfLearnCredits || 0;
      this.description = body.description || '';
      this.courseOutcomes = body.courseOutcomes || [];
    }
  }
  modelize(course) {
    this._id = course._id;
    this.courseCode = course.courseCode;
    this.previousCourseCode = course.previousCourseCode;
    this.requireCourseCode = course.requireCourseCode;
    this.courseNameVN = course.courseNameVN;
    this.courseNameEN = course.courseNameEN;
    this.instructors = course.instructors;
    this.assistants = course.assistants;
    this.description = course.description;
    this.type = course.type;
    this.numberOfTheoryCredits = course.numberOfTheoryCredits;
    this.numberOfPracticeCredits = course.numberOfPracticeCredits;
    this.numberOfSelfLearnCredits = course.numberOfSelfLearnCredits;
    this.description = course.description;
    this.courseOutcomes = course.courseOutcomes;
  }
}
