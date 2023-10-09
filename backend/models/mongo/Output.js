const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const outputSchema = new mongoose.Schema({
  outputSignature:{ type: String,required: [true, 'Yêu cầu cần ký hiệu chuẩn đầu ra môn học'] },
  description:{ type: String,required: [true, 'Yêu cầu cần ký hiệu chuẩn đầu ra môn học'] },
  outputEducate: { type: String, enum: ['LO1', 'LO2', 'LO3'], default: 'LO1' },
  lectureLevel: [{ type: String}],
  outpuLevel: [{ type: String }],

});


const Output = mongoose.model('Output', outputSchema);

module.exports = Output;
