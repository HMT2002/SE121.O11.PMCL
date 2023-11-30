const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const levelOfTeachingAssertmentSchema = new mongoose.Schema({
  label: { type: String, default: 'Không có dán nhãn' },
  levels: [{ type: Object }],
  description: { type: String, default: 'Không có mô tả' },
});

const LevelOfTeaching = mongoose.model('LevelOfTeaching', levelOfTeachingAssertmentSchema);

module.exports = LevelOfTeaching;
