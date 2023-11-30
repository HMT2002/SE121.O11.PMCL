const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const SyllabusValidateStatus=require('../../constants/SyllabusValidateStatus')
const historySchema = new mongoose.Schema({
  field: { type: String },
  note: { type: String },
  modifiedValue: { type: Object, default: {}, required: false },
  createdDate: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có người tạo thay đổi'] },
  syllabus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Syllabus',
    required: [true, 'Yêu cầu thay đổi phải thuộc về đề cương nào đó'],
  },
  prevHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false },
  validator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có người chấp thuận thay đổi'] },
  validateDate: { type: Date, default: Date.now },
  authority: { type: String, enum: ['Verified', 'Pending', 'Rejected'], default: SyllabusValidateStatus.Pending },
  headMasterSignature: { type: String, default: '' },
  instructorSignature: { type: String, default: '' },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
