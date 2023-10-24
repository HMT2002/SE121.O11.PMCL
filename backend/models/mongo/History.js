const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const historySchema = new mongoose.Schema({
  field: { type: String, required: [true, 'Cần có trường thông tin thay đổi'] },
  note: { type: String, required: [true, 'Cần có ghi chú'] },
  oldValue: { type: Object, default: {}, required: false },
  newValue: { type: Object, default: {}, required: false },
  createdDate: { type: Date, default: Date.now() },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có người tạo thay đổi'] }],
  syllabus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', required: [true, 'Yêu cầu thay đổi phải thuộc về đề cương nào đó'] }],
  prevHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false}],

});

const History = mongoose.model('History', historySchema);

module.exports = History;
