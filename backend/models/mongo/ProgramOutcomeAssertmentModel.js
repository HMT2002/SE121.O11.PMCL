const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const programOutcomeAssertmentModelSchema = new mongoose.Schema({
  label: { type: String },
  programOutcomeAssessment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgramOutcomeAssertment' }],

});


const ProgramOutcomeAssertmentModel = mongoose.model('ProgramOutcomeAssertmentModel', programOutcomeAssertmentModelSchema);

module.exports = ProgramOutcomeAssertmentModel;
