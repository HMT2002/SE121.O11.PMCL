const Log = require('../models/mongo/Log');
const catchAsync = require('../utils/catchAsync');

exports.LoggerDB = async (req, message) => {
  try {
    const log = await Log.create({ user: req.user, message: message });
  } catch (error) {
    console.log(error);
  }
};

exports.GetAllLog = catchAsync(async (req, res, next) => {
  console.log('GetAllLog');
  const logs = await Log.find({}).populate('user');
  res.status(200).json({
    status: 200,
    data: logs,
  });
});
