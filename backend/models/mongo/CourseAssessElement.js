const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const courseAssessElementSchema = new mongoose.Schema({
  courseOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outcome' }],
  description: { type: String, default: 'Không có mô tả' },
  label: { type: String, default: 'Không có nhãn dán' },
  assessLevel: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  rubrics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' }],
  code: { type: String, required: [true, 'Yêu cầu có mã đánh giá'] },
  details: [{ type: Object }],
});

const CourseAssessElement = mongoose.model('CourseAssessElement', courseAssessElementSchema);

module.exports = CourseAssessElement;
