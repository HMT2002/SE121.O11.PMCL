const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: [true, 'Yêu cầu cần có mã môn'] },
  courseNameVN: { type: String,required: [true, 'Yêu cầu cần có tên môn học tiếng Việt'] },
  courseNameEN: { type: String,default:'' },
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
