const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const tokenSchema = new mongoose.Schema({
  revoked: { type: Boolean, default: false },
  expired: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Refresh must belong to someone'] },
  refresh: { type: String, required: [true, 'Refresh must belong to someone'] },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
