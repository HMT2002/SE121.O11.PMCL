const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserAuthority=require('../../constants/UserAuthority')
const userRoleSchema = new mongoose.Schema({
  authority: { type: String, enum: ['Viewer', 'Editor', 'Moderator','Admin'], default: UserAuthority.Viewer },
  title: { type: String,default:'' },
  description: { type: String,default:'' },

});


const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
