const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const rubricSchema = new mongoose.Schema({
  courseOutcomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outcome' }],
  description: { type: String, default: 'Không có mô tả' },
  rubricExRequirement: { type: String, default: 'Không có yêu cầu' },
  rubricGoRequirement: { type: String, default: 'Không có yêu cầu' },
  rubricMidRequirement: { type: String, default: 'Không có yêu cầu' },
});

const Rubric = mongoose.model('Rubric', rubricSchema);

module.exports = Rubric;
