const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeSchema = new mongoose.Schema({
  label: { type: String },
  description: { type: String ,default:'Không có mô tả'},
  label: { type: String,default:'Không có dán nhãn' },

});


const ProgramOutcome = mongoose.model('ProgramOutcome', programOutcomeSchema);

module.exports = ProgramOutcome;
