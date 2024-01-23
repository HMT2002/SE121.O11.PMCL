const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const outputSchema = new mongoose.Schema({
  id: { type: String, required: [true, 'Yêu cầu cần ký hiệu chuẩn đầu ra môn học'] },
  description: { type: String, default: 'Không có mô tả' },
  label: { type: String, default: 'Không có nhãn' },
  levelOfTeaching: [{ type: String }],
  level: [{ type: String }],
  courseGoal: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseGoal' },
});

const Outcome = mongoose.model('Outcome', outputSchema);

module.exports = Outcome;
