const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const TypeOfCourse = require('../../constants/TypeOfCourse');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: [true, 'Yêu cầu cần có mã môn'], unique: true },
  courseNameVN: { type: String, required: [true, 'Yêu cầu cần có tên môn học tiếng Việt'] },
  courseNameEN: { type: String, default: '' },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assistants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, default: 'Không có mô tả' },
  type: {
    type: String,
    enum: ['Đại cương', 'Cơ sở nhóm ngành', 'Cơ sở ngành', 'Chuyên ngành', 'Tốt nghiệp'],
    default: TypeOfCourse.DaiCuong,
  },
  prerequisiteCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  preCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  numberOfTheoryCredits: { type: Number, default: 0 * 1 },
  numberOfPracticeCredits: { type: Number, default: 0 * 1 },
  numberOfSelfLearnCredits: { type: Number, default: 0 * 1 },
  courseGoals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseGoal' }],
  courseRequirements: [{ type: String }],
  courseDocuments: [{ type: String }],
  courseTools: [{ type: String }],
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: [true, 'Yêu cầu cần có mã khoa'] },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
