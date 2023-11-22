const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const courseAssessElementSchema = new mongoose.Schema({
  description: { type: String ,default:'Không có mô tả'},
  label: { type: String ,default:'Không có nhãn dán'},

});


const CourseAssessElement = mongoose.model('CourseAssessElement', courseAssessElementSchema);

module.exports = CourseAssessElement;
