const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const syllabusSchema = new mongoose.Schema({
  courseCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: [true, 'Yêu cầu phải có mã môn học'] },
  //làm thế này để lưu mảng
  previousCourseCode: [{ type: String, }],
  requireCourseCode: [{ type: String, }],
  knowledgeBlock: { type: String, enum: ['Đại cương', 'Cơ sở nhóm ngành', 'Cơ sở ngành','Chuyên ngành','Tốt nghiệp'], default: 'Đại cương' },
  departmentCode: { type: String,required: [true, 'Yêu cầu cần có mã khoa'] },
  lectureName: { type: String, required: [true, 'Yêu cầu phải có tên giảng viên'] },
  lectureEmail: { type: String, required: [true, 'Yêu cầu phải có email của giảng viên'] },
  lectureID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, required: [true, 'Yêu cầu phải có mã giảng  viên'] },
  numberOfTheory: { type: Number, default: 0 * 1 },
  numberOfPractice: { type: Number, default: 0 * 1 },
  numberOfSelfLearn: { type: Number, default: 0 * 1 },
  description: { type: String, required: [true, 'Yêu cầu phải có mô tả môn học'] },
  outputStandard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Output', required: [true, 'Yêu cầu phải có chuẩn đầu ra môn học'] }],
  theoryContent: [{ type: String, required: [true, 'Yêu cầu phải có nội dung môn học lý thuyết'] }],
  practiceContent: [{ type: String, required: [true, 'Yêu cầu phải có nội dung môn học thực hành'] }],
  evaluatePart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluate', required: [true, 'Yêu cầu phải có thành phần đánh giá môn học'] }],
  syllabusRules: { type: String },
  syllabusDocuments: { type: String },
  syllabusTools: { type: String },
  approved: { type: Boolean, default: false },

  createdDate: { type: Date, default: Date.now() },
  lastUpdated: { type: Date, default: Date.now() },
  headMasterSignature:{ type: String,required: [true, 'Yêu cầu cần có chữ ký của trưởng khoa'] },
  lectureSignature:{ type: String,required: [true, 'Yêu cầu cần có chữ ký của giảng viên biên soạn'] },

});


const Syllabus = mongoose.model('Syllabus', syllabusSchema);

module.exports = Syllabus;
