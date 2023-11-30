const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const notificationSchema = new mongoose.Schema({
  content: { type: String, default: ''},
  createdDate: { type: Date, default: Date.now },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có người tạo thay đổi'] },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Yêu cầu phải có người chấp thuận thay đổi'] },
  isViewed:{ type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
