const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const departmentSchema = new mongoose.Schema({
  title: { type: String,required: [true, 'Yêu cầu cần có tên khoa'] },
  description: { type: String ,default:'Không có mô tả'},
  chairman: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có trưởng khoa'] },
  viceChairman: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

});


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
