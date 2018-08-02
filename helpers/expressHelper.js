var MainHelper = require('./mainHelper');
var settings = require('../config/settings');
var Logger = require('../config/logger');

module.exports = function () {
    return {
        createLogger: function (req, res, next) {
            req.logger = new Logger(settings);
            next();
        },

        parseCurrentUser: function (req, res, next) {
            var jwtHelper = MainHelper.getHelper('jwt', req.logger);

            req.logger.info('Checking if there is Bearer Authorization token');
            req.logger.debug(req.headers);
            if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
                req.logger.info('There is a Bearer Authorization token', req.headers['Authorization']);
                var data = req.headers['authorization'].split(' ');

                var user = jwtHelper.decodeToken(data[1]);

                if (user) {
                    req.logger.debug('Current user is ', user);
                    req.currentUser = user;
                    req.logger.currentUser = user;
                    req.logger.configureFormat();
                } else {
                    req.logger.warn('The Bearer Authorization is invalid');
                }
            } else {
                req.logger.info('There is no Bearer Authorization token');
            }
            next();
        },

        requireLogin: function (req, res, next) {
            if (req.currentUser) {
                req.logger.info('There is a current user logged in');
                next();
            } else {
                req.logger.info('There is no user logged in');
                res.status(403).json({});
            }
        },

        requireSupport: function (req, res, next) {
            if (req.currentUser) {
                if (req.currentUser.role === 'admin' || req.currentUser.role === 'support') {
                    next();
                } else {
                    res.status(401).json({});
                }
            } else {
                res.status(403).json({});
            }
        },

        requireAdmin: function (req, res, next) {
            if (req.currentUser) {
                if (req.currentUser.role === 'admin') {
                    next();
                } else {
                    res.status(401).json({});
                }
            } else {
                res.status(403).json({});
            }
        },

        requireSameUser: function (req, res, next) {
            if (req.currentUser) {
                req.logger.debug('Current user', req.currentUser);
                req.logger.debug('Target user id', req.params.id);
                if (req.currentUser.role === 'admin' || req.currentUser.id === req.params.id) {
                    req.logger.info('Current user is the target user');
                    next();
                } else {
                    req.logger.info('Current user is not the target user');
                    res.status(404).json({});
                }
            } else {
                res.status(403).json({});
            }
        }
    };
};