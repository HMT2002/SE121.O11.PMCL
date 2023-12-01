const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const levelOfTeaching = new mongoose.Schema({
  description: { type: String, default: 'Không có mô tả' },
  label: { type: String, default: 'Không có dán nhãn' },
});

const LevelOfTeaching = mongoose.model('LevelOfTeaching', levelOfTeaching);

module.exports = LevelOfTeaching;
