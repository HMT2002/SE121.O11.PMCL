const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const scheduleSchema = new mongoose.Schema({
  courseOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseOutcome' }],
  description: { type: String, default: 'Không có mô tả' },
  id: { type: String, required: [true, 'Yêu cầu phải có mã lịch học'] },
  class: { type: String, required: [true, 'Yêu cầu phải có tên lịch học'] },
  courseAssess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseAssessElement' }],
  activities: { type: String, default: 'Không có hoạt động' },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
