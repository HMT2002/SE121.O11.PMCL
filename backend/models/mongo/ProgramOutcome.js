const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeSchema = new mongoose.Schema({
  assessmentLevel: { type: String, required: [true, 'Yêu cầu có mức độ đánh giá chương trình'] },
  description: { type: String, default: 'Không có mô tả' },
  label: { type: String, default: 'Không có dán nhãn' },
  outcomeLevel: { type: String, required: [true, 'Yêu cầu có mức độ đầu ra chương trình'] },
  outcomeAssessment: { type: String, required: [true, 'Yêu cầu có đánh giá đầu ra chương trình'] },
  programOutcomeCode: { type: String, required: [true, 'Yêu cầu có mã đầu ra chương trình'] },
});

const ProgramOutcome = mongoose.model('ProgramOutcome', programOutcomeSchema);

module.exports = ProgramOutcome;
