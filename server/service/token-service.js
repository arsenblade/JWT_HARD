const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: '15s'})
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {expiresIn: '30s'})
    return {accessToken, refreshToken}
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH_KEY)
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService();