const fs = require('fs');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('./../models/mongo/User');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const driveAPI = require('../modules/driveAPI');
const imgurAPI = require('../modules/imgurAPI');
const cloudinary = require('../modules/cloudinaryAPI');
const mailingAPI = require('../modules/mailingAPI');
const notifyAPI = require('../modules/notifyAPI');

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

exports.GetUserByToken = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user === undefined) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 200,
    data: user,
  });
});

exports.UpdateUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (req.body.username !== '' && req.body.username) {
    user.username = req.body.username;
  }
  if (req.body.email !== '' && req.body.email) {
    user.email = req.body.email;
  }
  if (req.body.birthday !== '' && req.body.birthday) {
    user.birthday = req.body.birthday;
  }
  if (req.body.address !== '' && req.body.address) {
    user.address = req.body.address;
  }
  if (req.body.phone !== '' && req.body.phone) {
    user.phone = req.body.phone;
  }
  if (req.body.photo) {
    user.photo = req.body.photo;
  }
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 200,
    data: user,
    message: 'success update instructor',
  });
});
exports.UpdateUserRole = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const userId = req.params.userId;

  const user = await User.findById(userId).populate([{ path: 'department', strictPopulate: false }]);
  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }
  user.role = req.body.role;
  await user.save({ validateBeforeSave: false });

  notifyAPI.CreateNotification(req.user, user, req.user.username + ' đã đổi vai trò của bạn thành ' + req.body.role);
  await req.syllabus.save();
  res.status(201).json({
    status: 200,
    data: user,
    message: 'success update role',
  });
});

exports.DeleteUserById = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const userId = req.params.userId;
  const user = await User.findById(userId).populate([{ path: 'department', strictPopulate: false }]);

  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  await user.deleteOne();
  res.status(204).json({
    status: 200,
    message: 'success delete user by ID',
  });
});

exports.DeleteUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const account = req.params.account;
  const user = await User.findOne({ account: account }).populate([{ path: 'department', strictPopulate: false }]);

  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }

  await user.deleteOne();
  res.status(204).json({
    status: 'success delete',
  });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).populate([{ path: 'department', strictPopulate: false }]);
  res.status(200).json({
    status: 200,
    data: users,
    requestTime: req.requestTime,
    url: req.originalUrl,
    message: 'Here is all the users!',
  });
});

exports.CreateUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({ ...req.body });
  res.status(200).json({
    message: 'Here is the new user!',
    newUser,
  });
});

exports.GetUsersByDepartment = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'Here is all the users!',
  });
});

exports.GetAllUsersByCourse = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'Here is all the users!',
  });
});

exports.GetRecentRegisteredUsers = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'Here is all the users!',
  });
});

exports.GetAllUpgradeRequest = catchAsync(async (req, res, next) => {
  const unaccepted_req = await UpgradeReq.find({ accepted: false });
  const accepted_req = await UpgradeReq.find({ accepted: true });

  res.status(200).json({
    status: 'success get all request',
    data: {
      unaccepted_req,
      accepted_req,
    },
  });
});

exports.GetUserUpgradeRequest = catchAsync(async (req, res, next) => {
  const unaccepted_req = await UpgradeReq.find({ accepted: false, user: req.user });
  const accepted_req = await UpgradeReq.find({ accepted: true, user: req.user });

  res.status(200).json({
    status: 'success get user request',
    data: {
      unaccepted_req,
      accepted_req,
    },
  });
});

exports.GetUserUpgradeRequestByAccount = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ account: req.params.account }).populate([
    { path: 'department', strictPopulate: false },
  ]);

  console.log(user);

  if (user === undefined || !user) {
    return next(new AppError('No user found!', 404));
  }

  if (!(user.account === req.user.account || req.user.role === 'admin')) {
    return next(new AppError('You are not the admin or owner of this account!', 401));
  }
  const unaccepted_req = await UpgradeReq.find({ accepted: false, user: user });
  const accepted_req = await UpgradeReq.find({ accepted: true, user: user });

  res.status(200).json({
    status: 'success get user request',
    data: {
      unaccepted_req,
      accepted_req,
    },
  });
});

exports.UploadImage = catchAsync(async (req, res, next) => {
  let photo = { link: 'https://i.imgur.com/KNJnIR0.jpg' };

  if (!req.file) {
  } else {
    photo = await imgurAPI({ image: fs.createReadStream(req.file.path), type: 'stream' });
  }

  if (req.file) {
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path, function (err) {
        if (err) throw err;
        console.log(req.file.path + ' deleted!');
      });
    } else {
    }
  }

  res.status(201).json({
    status: 'success upload image',
    data: photo.link,
  });
});
