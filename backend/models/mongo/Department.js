const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String,required: [true, 'Yêu cầu cần có tên khoa'] },
  description: { type: String ,default:'Không có mô tả'},

});


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
