const fs = require('fs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/mongo/User');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

const driveAPI = require('../modules/driveAPI');
const imgurAPI = require('../modules/imgurAPI');
const cloudinary = require('../modules/cloudinaryAPI');
const mailingAPI = require('../modules/mailingAPI');
const Notification = require('../models/mongo/Notification');

exports.CheckInput = catchAsync(async (req, res, next) => {
  var isInvalid = false;

  if (!req.body) {
    isInvalid = true;
  }

  if (isInvalid) {
    return next(new AppError('bodt is empty', 400));
  }
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if it's there

  console.log('protect');
  console.log(req.headers.authorization);
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if (token === undefined) {
  //   return next(new AppError('You are not login', 401));
  // }
  //2) Validate token

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded);
  //3) Check if user is existed

  const currentUser = await User.findById(decoded.id).populate([{ path: 'department', strictPopulate: false }]);
  //console.log(currentUser);

  if (!currentUser) {
    return next(new AppError('User no longer existed', 401));
  }
  //4) Check if user change password after JWT was issued

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please login again'));
  }

  // Access to protected route
  req.user = currentUser;
  next();
});

exports.GetUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;

  req.query.fields = 'account,createdDate,username,email,photo,role,lastUpdated';
  const features = new APIFeatures(
    User.findOne({ account: account }).populate([{ path: 'department', strictPopulate: false }]),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const user = await features.query;

  if (user === undefined || !user || !user[0]) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user[0].account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  res.status(200).json({
    status: 200,
    data: user,
  });
});

exports.GetUserById = catchAsync(async (req, res, next) => {
  req.query.fields = 'username, email, photo, role';

  const features = new APIFeatures(
    User.findOne({ _id: req.params.userId }).populate([{ path: 'department', strictPopulate: false }]),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const user = await features.query;

  if (user === undefined || !user || !user[0]) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 200,
    data: user,
  });
});
exports.GetUserEveryNotification = catchAsync(async (req, res, next) => {
  const user = req.user;
  const notifications = await Notification.find({ receiver: user._id })
    .populate('sender')
    .populate('receiver')
    .sort('isViewed')
    .sort('-createdDate');
  res.status(200).json({
    status: 200,
    data: notifications,
    requestTime: req.requestTime,
    url: req.originalUrl,
    message: 'Here is all the user notification!',
  });
});

exports.GetUserLimitNotification = catchAsync(async (req, res, next) => {
  const user = req.user;
  const features = new APIFeatures(
    Notification.find({ receiver: user._id })
      .populate('sender')
      .populate('receiver')
      .sort('isViewed')
      .sort('-createdDate'),
    req.query
  )
    .filter()
    .limitFields()
    .paginate()
    .populateObjects()
    .category()
    .timeline();
  const notifications = await features.query;

  res.status(200).json({
    status: 200,
    data: notifications,
    requestTime: req.requestTime,
    url: req.originalUrl,
    message: 'Here is all the user notification!',
  });
});

exports.SetNotifiesViewed = catchAsync(async (req, res, next) => {
  const arrNotifies = req.body.arrNotifies;
  for (let i = 0; i < arrNotifies.length; i++) {
    const notify = await Notification.findById(arrNotifies[i]);
    notify.isViewed = true;
    notify.save();
  }

  res.status(200).json({
    status: 200,
    requestTime: req.requestTime,
    url: req.originalUrl,
    message: 'Set viewed!',
  });
});
