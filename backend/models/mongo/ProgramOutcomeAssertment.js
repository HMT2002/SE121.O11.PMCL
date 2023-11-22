const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeAssertmentSchema = new mongoose.Schema({
  label: { type: String },
  levels: [{ type: Object }],

});


const ProgramOutcomeAssertment = mongoose.model('ProgramOutcomeAssertment', programOutcomeAssertmentSchema);

module.exports = ProgramOutcomeAssertment;
