const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const rubricSchema = new mongoose.Schema({
  outputStandard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Output' }],
  rubricDescription:{ type: String },
  rubricExRequirement:{ type: String },
  rubricGoRequirement:{ type: String },
  rubricMidRequirement:{ type: String },
});


const Rubric = mongoose.model('Rubric', rubricSchema);

module.exports = Rubric;
