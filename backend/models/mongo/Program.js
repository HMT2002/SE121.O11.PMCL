const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programSchema = new mongoose.Schema({
  programCode: { type: String, required: [true, 'Yêu cầu cần có mã môn'] },
  title: { type: String, required: [true, 'Yêu cầu cần có tên chương trình tiếng Việt'] },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: false },
  description: { type: String, default: 'Không có mô tả' },
  programOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgramOutcome', required: false }],
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
