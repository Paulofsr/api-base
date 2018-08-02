// var settings = require('../../config/settings');
// var Logger = require('../../config/logger');
// var logger = new Logger(settings);
var videoBO = require('../../business/videoBO')();

module.exports = function () {
    return {
        getAll: function (req, res) {
            req.logger.info('[controllers-videos] GetAll methods.');
            // logger.log('debug', '[controllers-videos] GetAll methods.');
            res.status(200).json({});
            // var token = req.headers['authorization'] ? req.headers['authorization'] : req.query.authorization;
            // logger.log('info', '[controllers-videos] Find using Token. ', token);
            // videoBO.getAll(req.query)
            //     .then(
            //         function (videos) {
            //             res.status(200).json(videos);
            //         },
            //         function (erro) {
            //             logger.log('error', '[controllers-videos] An erro occurred when find video. ', erro)
            //             res.status(404).json(erro);
            //         });
        },

        getById: function (req, res) {
            videoBO.getById(req.params.id).then(function (video) {
                logger.log('debug', '[controllers-videos] The gitById return was:', video);
                res.status(200).json(video);
            }, function (error) {
                logger.log('error', '[controllers-videos] An error has occurred ')
                res.status(404).json(error);
            });
        },

        add: function (req, res) {
            logger.log('info', '[controllers-videos] Adding a new video.');
            return videoBO.add(req.body)
                        .then(function (rAdd) {
                            logger.log('debug', '[controllers-videos] Created a new video %s', rAdd);
                            // var token = req.headers['authorization'] ? req.headers['authorization'] : req.query.authorization;
                            // return updateVacation(res, rAdd, 201, '1', rAdd.user, "criação de Férias com sucesso.", token.split(' ')[1]);
                            res.status(201).json(rAdd);
                        })
                        .catch(function (error) {
                            logger.log('error', '[controllers-videos] Error in add Vacation', error);
                            res.status(500).json(error);
                        });
        },

        update: function (req, res) {
            logger.log('info', '[controllers-videos] Updating a video');
            if (req.body && req.body._id && req.body._id != req.params.id) {
                logger.log('error', '[controllers-videos] Id informed is invalid');
                res.status(422).json('Id informed is invalid.');
            }
            req.body._id = req.params.id;

            return updateVacation(res, req.body, 200);
        },

        delete: function (req, res) {
            logger.log('info', '[controllers-videos] Deleting a video');
            return videoBO.delete(req.params.id).then(function () {
                        logger.log('info', '[controllers-videos] Deleting a video by id', req.params.id);
                        res.status(200).end();
                    }, function (error) {
                        logger.log('error', '[controllers-videos] Error in delete Vacation', error);
                        res.status(500).json(error);
                    });
        }
    };

};