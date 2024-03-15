const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const contentSchema = new mongoose.Schema({
  courseCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: [true, 'Yêu cầu phải có mã môn học'] },
  numberOfClass: { type: Number, default: 0 * 1 },
  courseContent: { type: String, required: [true, 'Yêu cầu phải có nội dung môn học'] },
  teachingContent: { type: String },
  studyContent: { type: String },
  homeworkContent: { type: String },

  courseOutcomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseOutcome',
      required: [true, 'Yêu cầu phải có chuẩn đầu ra môn học'],
    },
  ],
  evaluatePart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evaluate',
      required: [true, 'Yêu cầu phải có thành phần đánh giá môn học'],
    },
  ],
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
