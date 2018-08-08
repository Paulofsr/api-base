// var logger = require('winston');
var logger = require('../config/logger')();
var mongoose = require('mongoose');
var users = require('../models/user')();

module.exports = function () {
    return {
        getAll: function (search) {
            return new Promise(function (resolve, reject) {
                logger.info('[business-userBO] Getting users from database');
                users.find()
                    .exec()
                    .then(function (users) {
                        logger.info('[business-userBO] %d users were returned', users.length);
                        resolve(users);
                    }, function (erro) {
                        logger.error('[business-userBO] An error has ocurred while getting users from database', erro);
                        reject(erro);
                    });
            });
        },

        getById: function (id) {
            logger.info('[business-userBO] Getting a user by id %s', id);
            return new Promise(function (resolve, reject) {

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    logger.error('[business-userBO] The id informed is not valid on gtById method.', id);
                    reject('The id informed is not valid.');
                }
                users.findById(id)
                    .exec()
                    .then(function (user) {
                        if (!user) {
                            logger.info('[business-userBO] No user found');
                        } else {
                            logger.error('[business-userBO] user was found');
                        }
                        resolve(user);
                    }, function (erro) {
                        logger.error('[business-userBO] An error has occurred while geeting a user by id %s', id, erro);
                        reject(erro);
                    });
            });
        },

        update: function (user) {
            logger.info('[business-userBO] Start update userBO.');
            return new Promise(function (resolve, reject) {
                logger.info('[business-userBO] Updating a user');
                users.findByIdAndUpdate(user._id, user, { 'new': true })
                    .exec()
                    .then(function (userUpdated) {
                        logger.info('[business-userBO] The User has been updated successfully');
                        resolve(userUpdated);
                    }, function (erro) {
                        logger.error('[business-userBO] An error has ocurred while updating an User', erro);
                        reject(erro);
                    });
            });
        },

        add: function (user) {
            logger.info('[business-userBO] Start add userBO.');
            return new Promise(function (resolve, reject) {
                users.create(user)
                    .then(function (nuser) {
                        logger.info('[business-userBO] The user has been added successfully.');
                        resolve(nuser);
                    }, function (erro) {
                        logger.error('[business-userBO] An error has ocurred while adding a user.', erro);
                        reject(erro);
                    });
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                logger.info('[business-userBO] Deleting the user by id %s', id);

                users.remove({
                        '_id': id
                    }).exec()
                    .then(function () {
                        logger.info('[business-userBO] The user has been deleted successfully');
                        resolve();
                    }, function (erro) {
                        logger.error('[business-userBO] An error has occurred while deleting a user by id %s. Error: %s', id, erro);
                        reject(erro);
                    });
            });
        }
    };
};
