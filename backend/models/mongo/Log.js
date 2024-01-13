const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const logSchema = new mongoose.Schema({
  message: { type: String, required: [true, 'Log must have message'] },
  createdDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Log must belong to someone'] },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
