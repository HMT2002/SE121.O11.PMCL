const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeAssertmentSchema = new mongoose.Schema({
  label: { type: String },
  description: { type: String ,default:'Không có mô tả'},
});


const ProgramOutcomeAssertment = mongoose.model('ProgramOutcomeAssertment', programOutcomeAssertmentSchema);

module.exports = ProgramOutcomeAssertment;
