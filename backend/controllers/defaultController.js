const catchAsync = require('./../utils/catchAsync');
exports.Default = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
  });
});
