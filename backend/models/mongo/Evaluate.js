const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const evaluateSchema = new mongoose.Schema({
  evaluateCategory:[{ type: String }],
  evaluateContent:[{ type: String }],

  outputStandard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Output' }],
  percentage:{type:Number},
  rubric: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' }],

});


const Evaluate = mongoose.model('Evaluate', evaluateSchema);

module.exports = Evaluate;
