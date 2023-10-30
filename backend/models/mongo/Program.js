const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programSchema = new mongoose.Schema({
  programCode: { type: String, required: [true, 'Yêu cầu cần có mã môn'] },
  programNameVN: { type: String,required: [true, 'Yêu cầu cần có tên chương trình tiếng Việt'] },
  programNameEN: { type: String,default:'' },
  description: { type: String ,default:'Không có mô tả'},

});


const Program = mongoose.model('Program', programSchema);

module.exports = Program;
