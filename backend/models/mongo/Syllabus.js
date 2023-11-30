const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const syllabusSchema = new mongoose.Schema({
  courseCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: [true, 'Yêu cầu phải có mã môn học'] },
  //làm thế này để lưu mảng
  courseOutcomes: [{ type: Object}],
  courseAssessments: [{ type: Object}],
  courseSchedules: [{ type: Object}],

  mainHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false},

});


const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = Syllabus;
