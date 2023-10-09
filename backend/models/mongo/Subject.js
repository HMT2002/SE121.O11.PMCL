const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: [true, 'Yêu cầu cần có mã môn'] },
  subjectNameVN: { type: String,required: [true, 'Yêu cầu cần có tên môn học tiếng Việt'] },
  subjectNameEN: { type: String,default:'' },
});


const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
