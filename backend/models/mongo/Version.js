const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const versionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Course'],
  },
  date: { type: Date },
  oldValue: { type: Object, required: false },
  newValue: { type: Object, required: false },
  syllabus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Syllabus'],
  },
  note: { type: String },
});

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;
