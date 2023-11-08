const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const syllabusSchema = new mongoose.Schema({
  courseCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: [true, 'Yêu cầu phải có mã môn học'] },
  //làm thế này để lưu mảng
  previousCourseCode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course',}],
  requireCourseCode: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', }],
  knowledgeBlock: { type: String, enum: ['Đại cương', 'Cơ sở nhóm ngành', 'Cơ sở ngành','Chuyên ngành','Tốt nghiệp'], default: 'Đại cương' },
  departmentCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Department',required: [true, 'Yêu cầu cần có mã khoa'] },
  instructorName: { type: String, required: [true, 'Yêu cầu phải có tên giảng viên'] },
  instructorEmail: { type: String, required: [true, 'Yêu cầu phải có email của giảng viên'] },
  instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, required: [true, 'Yêu cầu phải có mã giảng  viên'] },
  numberOfTheoryCredits: { type: Number, default: 0 * 1 },
  numberOfPracticeCredits: { type: Number, default: 0 * 1 },
  numberOfSelfLearnCredits: { type: Number, default: 0 * 1 },
  description: { type: String, default:'Không có mô tả'},
  outputStandard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Output', required: [true, 'Yêu cầu phải có chuẩn đầu ra môn học'] }],
  theoryContent: [{ type: String, default :'Yêu cầu phải có nội dung môn học lý thuyết' }],
  practiceContent: [{ type: String, default: 'Yêu cầu phải có nội dung môn học thực hành' }],
  evaluatePart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluate', required: [true, 'Yêu cầu phải có thành phần đánh giá môn học'] }],
  syllabusRules: { type: String },
  syllabusDocuments: { type: String },
  syllabusTools: { type: String },
  approved: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
  headMasterSignature:{ type: String },
  instructorSignature:{ type: String },
  mainHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false},

});


const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = Syllabus;
