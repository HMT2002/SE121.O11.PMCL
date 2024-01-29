const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const courseGoalSchema = new mongoose.Schema({
  id: { type: String, required: [true, 'Yêu cầu cần ký hiệu đầu ra môn học'] },
  description: { type: String, default: 'Không có mô tả' },
  requirement: { type: String, default: 'Không có yêu cầu' },
  programOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgramOutcome' }],
  maxScore: { type: Number, default: 0 },
});

const CourseGoal = mongoose.model('CourseGoal', courseGoalSchema);

module.exports = CourseGoal;
