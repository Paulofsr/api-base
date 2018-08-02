var jwt = require('jsonwebtoken');
var settings = require('../config/settings');

module.exports = function (logger) {
    return {
        secret: settings.jwt.secret,
        expiresIn: settings.jwt.expiresIn,

        createToken: function (user) {
            return jwt.sign(user, settings.jwt.secret, {
                expiresIn: settings.jwt.expiresIn
            });
        },

        decodeToken: function (token) {
            try {
                logger.debug('[JWTHelper.decodeToken] Verifying the token', JSON.stringify(token));
                return jwt.verify(token, settings.jwt.secret);
            } catch (err) {
                logger.debug('[JWTHelper.decodeToken] The token is invalid', JSON.stringify(token));
                return null;
            }
        }
    };
};