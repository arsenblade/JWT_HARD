const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token) {
      return next(ApiError.UnauthorizedError())
    }
    const verifyToken = tokenService.validateAccessToken(token)
    if(!verifyToken) {
      return next(ApiError.UnauthorizedError())
    }
    
    req.user = verifyToken
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}