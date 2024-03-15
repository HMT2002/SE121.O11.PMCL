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
const Notification = require('../models/mongo/Notification');

const imgurAPI = require('./imgurAPI');
const mailingAPI = require('./mailingAPI');
const historyAPI = require('./historyAPI');

const moment = require('moment');

const CreateNotification = async (sender, receiver, content) => {
  const notify = await Notification.create({ sender: sender, receiver: receiver, content: content });
  return notify;
};

module.exports = { CreateNotification };
