const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const History = require('../models/mongo/History');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const moment = require('moment');

exports.Create = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

const getHistoryBranches = async (history, index = 'F0') => {
  let historyBranches = [];
  historyBranches.push([{ history, index }]);
  let branches = await History.find({ prevHistory: history._id });
  if (branches.length > 0) {
    for (let i = 0; i < branches.length; i++) {
      const historyBranch = await getHistoryBranches(branches[i], index + 'F' + (i + 1));
      historyBranches.push(historyBranch);
    }
    return historyBranches;
  }
  return historyBranches;
};

exports.GetHistoryBranches = async (history) => {
  const branches = await getHistoryBranches(history);

  return branches;
};

const getHistoryPrevHistory = async (history) => {
  if (history.prevHistory) {
    let prevHistory = await History.findOne({ _id: history.prevHistory._id }).populate('prevHistory').lean();
        history.prevHistory=await getHistoryPrevHistory(prevHistory);
        return history;
  }
  else{
      return history;

  }
};

exports.GetHistoryPrevHistory = async (history) => {
  const branches = await getHistoryPrevHistory(history);

  return branches;
};
