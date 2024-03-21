const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { ErrorEnum } = require('../../constants/ErrorEnum');

const versionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Course'],
  },
  date: { type: Date, default: Date.now },
  oldValue: { type: Object, required: false },
  newValue: { type: Object, required: false },
  syllabus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Syllabus'],
  },
  ver_note: [{ type: String }],
});

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;
