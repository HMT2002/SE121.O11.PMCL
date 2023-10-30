const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeSchema = new mongoose.Schema({
  label: { type: String },
  description: { type: String ,default:'Không có mô tả'},
  level: { type: Number,default:0 },
  assertment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgramOutcomeAssertment' }],

});


const ProgramOutcome = mongoose.model('ProgramOutcome', programOutcomeSchema);

module.exports = ProgramOutcome;
