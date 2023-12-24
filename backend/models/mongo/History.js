const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const SyllabusValidateStatus = require('../../constants/SyllabusValidateStatus');
const { ErrorEnum } = require('../../constants/ErrorEnum');
const historySchema = new mongoose.Schema({
  field: { type: String },
  note: { type: String },
  createdDate: { type: Date, default: Date.now },
  syllabuses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Syllabus',
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, ErrorEnum.ERROR_MISSING_INPUT + ' : Course'],
  },
  validator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  validateDate: { type: Date, default: Date.now },
  authority: { type: String, enum: ['Verified', 'Pending', 'Rejected'], default: SyllabusValidateStatus.Pending },
  headMasterSignature: { type: String, default: '' },
  instructorSignature: { type: String, default: '' },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
