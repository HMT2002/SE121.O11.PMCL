const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const SyllabusValidateStatus = require('../../constants/SyllabusValidateStatus');
const { ErrorEnum } = require('../../constants/ErrorEnum');
const assignmentSchema = new mongoose.Schema({
  field: { type: String },
  note: { type: String },
  createdDate: { type: Date, default: Date.now },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Course'],
  },
  validateDate: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
