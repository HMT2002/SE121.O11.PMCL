const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/mongo/User');
const Content = require('../models/mongo/Content');
const Evaluate = require('../models/mongo/Evaluate');
const Syllabus = require('../models/mongo/Syllabus');
const Rubric = require('../models/mongo/Rubric');
const Course = require('../models/mongo/Course');
const Department = require('../models/mongo/Department');


const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const imgurAPI = require('../modules/imgurAPI');
const mailingAPI = require('../modules/mailingAPI');
const moment = require('moment');

exports.CreateFaculty = catchAsync(async (req, res, next) => {

  const testDepartment=await Department.find({departmentName:req.body.departmentName});
  if(testDepartment.length!==0){
    res.status(200).json({
      status: 'unsuccess',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }

  const department=await Department.create({...req.body});
  res.status(200).json({
    status: 'success',
    department,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetID = catchAsync(async (req, res, next) => {
  const department=await Department.findOne({_id:req.params.id});
  const objname = 'department';
  if (!department) {
    return next(new AppError('Cant find ' + objname + ' with id ' + id, 404));
  }
  req.department = department;
  next();
});

exports.GetFaculty = catchAsync(async (req, res, next) => {
  const department=await Department.findOne({_id:req.params.id});
  res.status(200).json({
    status: 'success',
    department,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllFaculty = catchAsync(async (req, res, next) => {
  const departments=await Department.find({});

  res.status(200).json({
    status: 'success',
    departments,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});



exports.UpdateFaculty = catchAsync(async (req, res, next) => {

  const department = await Department.findOne({ _id: req.params.id });
  if (department === undefined || !department) {
    return next(new AppError('No course found!', 404));
  }
  const {departmentName,description}=req.body;

  department.departmentName=departmentName;
  department.description=description;
  await department.save();
  res.status(200).json({
    status: 'success',
    department,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.DeleteFaculty = catchAsync(async (req, res, next) => {

  const department = await Department.findOne({ _id: req.params.id });
  if (department === undefined || !department) {
    return next(new AppError('No course found!', 404));
  }
  await department.deleteOne();
  res.status(200).json({
    status: 'success delete department',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
