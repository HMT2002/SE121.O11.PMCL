const User = require('../models/mongo/User');
const Course = require('../models/mongo/Course');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const notifyAPI = require('../modules/notifyAPI');
const loggerAPI = require('../modules/loggerAPI');

const Assignment = require('../models/mongo/Assignment');
const History = require('../models/mongo/History');

exports.Create = catchAsync(async (req, res, next) => {
  const testCourse = await Course.find({ code: req.body.code });
  if (testCourse.length !== 0) {
    res.status(200).json({
      status: 'unsuccess',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const course = await Course.create({ ...req.body });
  const history = await History.create({ course: course });
  const assignment = await Assignment.create({ course: course });

  res.status(200).json({
    status: 200,
    data: course,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetByID = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('department');

  res.status(200).json({
    status: 200,
    data: course,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllByDepartment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAll = catchAsync(async (req, res, next) => {
  const courses = await Course.find({}).populate('department');
  res.status(200).json({
    status: 200,
    data: courses,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.AssignUserToCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const userID = req.body.user;
  const assignment = await Assignment.findOne({ course: course._id });
  const user = await User.findById(userID);
  if (!user) {
    res.status(200).json({
      status: 400,
      message: 'Not found user',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  assignment.users.push(user._id);
  await assignment.save();
  notifyAPI.CreateNotification(
    req.user,
    user,
    req.user.username + ' đã phân công đề cương môn ' + course.courseNameVN + ' cho bạn'
  );
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.ResignUserFromCourse = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const userID = req.body.user;
  const assignment = await Assignment.findOne({ course: course._id });
  const user = await User.findById(userID);
  if (!user) {
    res.status(200).json({
      status: 400,
      message: 'Not found user',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const index = assignment.users.indexOf(user._id);
  if (index > -1) {
    // only splice array when item is found
    assignment.users.splice(index, 1); // 2nd parameter means remove one item only
    await assignment.save();
  }

  notifyAPI.CreateNotification(
    req.user,
    user,
    req.user.username + ' đã xóa phân công môn ' + course.courseNameVN + ' của bạn'
  );
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetCourseAssignment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findById(id).populate('department');
  const assignment = await Assignment.findOne({ course: course._id })
    .populate('users')
    .populate([{ path: 'user', strictPopulate: false }])
    .populate('course')
    .populate({ path: 'course', populate: { path: 'department' } });
  if (!assignment) {
    res.status(200).json({
      status: 400,
      message: 'Not found assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetUserCourseAssignment = catchAsync(async (req, res, next) => {
  const user = req.user;
  var assignment;
  if (req.user.role === 'admin' || req.user.role === 'chairman') {
    assignment = await Assignment.find({})
      .populate('users')
      .populate('course')
      .populate({ path: 'course', populate: { path: 'department' } });
  } else {
    assignment = await Assignment.find({ users: user._id })
      .populate('users')
      .populate('course')
      .populate({ path: 'course', populate: { path: 'department' } });
  }

  if (!assignment) {
    res.status(200).json({
      status: 400,
      message: 'Not found assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignment,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.CheckIsUserAssignedToCourse = catchAsync(async (req, res, next) => {
  const user = req.user;
  const courseID = req.params.id;
  if (req.user.role === 'admin' || req.user.role === 'chairman') {
    res.status(200).json({
      status: 200,
      isAssigned: true,
      message: 'Yes, it the admin or chairman!',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  const assignment = await Assignment.findOne({ users: user._id, course: courseID });
  if (!assignment) {
    res.status(200).json({
      status: 400,
      isAssigned: false,

      message: 'User is not assigned!',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    isAssigned: true,
    message: 'User is assigned!',
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.GetAllCourseAssignment = catchAsync(async (req, res, next) => {
  const assignments = await Assignment.find({})
    .populate('course')
    .populate({ path: 'users', populate: { path: 'department', strictPopulate: false } })
    .populate({ path: 'course', populate: { path: 'department' } });
  if (!assignments.length === 0) {
    res.status(200).json({
      status: 400,
      message: 'Not found any assignment',
      requestTime: req.requestTime,
      url: req.originalUrl,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    data: assignments,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});

exports.Update = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('department');
  if (course === undefined || !course) {
    return next(new AppError('No course found!', 404));
  }
  const {
    code,
    courseNameVN,
    courseNameEN,
    description,
    type,
    prerequisiteCourse,
    preCourse,
    numberOfTheoryCredits,
    numberOfPracticeCredits,
    numberOfSelfLearnCredits,
    department,
  } = req.body;
  course.code = code;
  course.courseNameEN = courseNameEN;
  course.courseNameVN = courseNameVN;
  course.description = description;
  course.type = type;
  course.prerequisiteCourse = prerequisiteCourse;
  course.preCourse = preCourse;
  course.numberOfTheoryCredits = numberOfTheoryCredits;
  course.numberOfSelfLearnCredits = numberOfSelfLearnCredits;
  course.numberOfPracticeCredits = numberOfPracticeCredits;
  course.department = department;

  await course.save();

  //Logger
  await loggerAPI.LoggerDB(req, req.user.username + ' đã sửa thông tin môn ' + course.courseNameVN);

  res.status(200).json({
    status: 200,
    message: 200,
    data: course,
    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
exports.Delete = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate('department');
  if (course === undefined || !course) {
    return next(new AppError('No course found!', 404));
  }
  await course.deleteOne();
  res.status(200).json({
    status: 'success delete course',

    requestTime: req.requestTime,
    url: req.originalUrl,
  });
});
