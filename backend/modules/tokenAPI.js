const Token = require('../models/mongo/Token');
const jwt = require('jsonwebtoken');

const RefreshToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};
const setRevokeAndExpiredToken = (id) => {
  try {
    //Set oldTokens to expired and revoked
    Token.updateMany({ user: id }, { $set: { revoked: true, expired: true } });
    const new_refresh_token = RefreshToken(id);
    Token.create({ user: decoded.id, refresh: new_refresh_token });
    return new_refresh_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { setRevokeAndExpiredToken };
