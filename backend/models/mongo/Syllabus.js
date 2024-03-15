const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { ErrorEnum } = require('../../constants/ErrorEnum');
const { SyllabusValidateStatus } = require('../../constants/SyllabusValidateStatus');

const syllabusSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Course'],
  },
  //làm thế này để lưu mảng
  courseOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseOutcome' }],
  courseAssessments: [
    {
      courseAssessment: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseAssessElement' },
      percentage: { type: Number, default: 0 },
    },
  ],
  courseSchedules: [
    {
      id: { type: String },
      class: { type: String },
      description: { type: String },
      activities: { type: String },
      courseAssessElements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseAssessElement' }],
      courseOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseOutcome' }],
    },
  ],
  mainHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có tác giả'] },
  validator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  validateDate: { type: Date },
  validated: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [SyllabusValidateStatus.Pending, SyllabusValidateStatus.Verified, SyllabusValidateStatus.Rejected],
    default: SyllabusValidateStatus.Pending,
  },

  note: { type: String },
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = Syllabus;
