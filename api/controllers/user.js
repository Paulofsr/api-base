var logger = require('../../config/logger')();
var userBO = require('../../business/userBO.js')();

module.exports = function () {
    return {
        getAll: function (req, res) {
            logger.info('[controllers-users] GetAll methods.');
            userBO.getAll(req.query)
                .then(
                    function (users) {
                        res.status(200).json(users);
                    },
                    function (erro) {
                        logger.error('[controllers-users] An erro occurred when find user. ', erro)
                        res.status(404).json(erro);
                    });
        },

        getById: function (req, res) {
            userBO.getById(req.params.id).then(function (user) {
                logger.debug('[controllers-users] The gitById return was:', user);
                res.status(200).json(user);
            }, function (error) {
                logger.error('[controllers-users] An error has occurred ')
                res.status(404).json(error);
            });
        },

        add: function (req, res) {
            logger.info('[controllers-users] Adding a new user.');
            userBO.add(req.body)
                .then(function (rAdd) {
                    logger.debug('[controllers-users] Created a new user %s', rAdd);
                    res.status(201).json(rAdd);
                }, function(error){
                    res.status(404).json(error);
                })
                .catch(function (error) {
                    logger.error('[controllers-users] Error in add Vacation', error);
                    res.status(500).json(error);
                });
        },

        update: function (req, res) {
            logger.info('[controllers-users] Updating a user');
            if (req.body && req.body._id && req.body._id != req.params.id) {
                logger.error('[controllers-users] Id informed is invalid');
                res.status(422).json('Id informed is invalid.');
            }
            userBO.update(req.body)
                .then(function (rAdd) {
                    logger.debug('[controllers-users] Update an user %s', rAdd);
                    res.status(200).json(rAdd);
                }, function (error) {
                    res.status(404).json(error);
                })
        },

        delete: function (req, res) {
            logger.info('[controllers-users] Deleting a user');
            return userBO.delete(req.params.id).then(function () {
                        logger.info('[controllers-users] Deleting a user by id', req.params.id);
                        res.status(204).end();
                    }, function (error) {
                        logger.error('[controllers-users] Error in delete Vacation', error);
                        res.status(500).json(error);
                    });
        }
    };

};