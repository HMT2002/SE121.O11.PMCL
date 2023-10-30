const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: [true, 'Yêu cầu cần có mã môn'] },
  courseNameVN: { type: String,required: [true, 'Yêu cầu cần có tên môn học tiếng Việt'] },
  courseNameEN: { type: String,default:'' },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  assistants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  description: { type: String ,default:'Không có mô tả'},
  type: { type: String, enum: ['Đại cương', 'Cơ sở nhóm ngành', 'Cơ sở ngành','Chuyên ngành','Tốt nghiệp'], default: 'Đại cương' },
  previousCourseCode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  requireCourseCode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  numberOfTheoryCredits: { type: Number, default: 0 * 1 },
  numberOfPracticeCredits: { type: Number, default: 0 * 1 },
  numberOfSelfLearnCredits: { type: Number, default: 0 * 1 },
  outputStandard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Output', required: [true, 'Yêu cầu phải có chuẩn đầu ra môn học'] }],

});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
