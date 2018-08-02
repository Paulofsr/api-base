var logger = require('winston');
var mongoose = require('mongoose');
var videos = require('../models/video')();

module.exports = function () {
    return {
        getAll: function (search) {
            return new Promise(function (resolve, reject) {
                logger.log('info', '[business-videoBO] Getting videos from database');
                // var filter = {};

                // if (search) {
                //     var filterOj = [];

                //     if (Object.getOwnPropertyNames(filter).length == 0) {
                //         logger.log('info', '[business-videoBO] Filter by dynamic parameters.');
                //         makeFilter(search, filter);
                //     }

                // }

                videos.find({})
                    .exec()
                    .then(function (videos) {
                        logger.log('info', '[business-videoBO] %d videos were returned', videos.length);
                        resolve(videos);
                    }, function (erro) {
                        logger.log('error', '[business-videoBO] An error has ocurred while getting videos from database', erro);
                        reject(erro);
                    });
            });
        },

        getById: function (id) {
            logger.log('info', '[business-videoBO] Getting a video by id %s', id);
            return new Promise(function (resolve, reject) {

                if (!mongoose.Types.ObjectId.isValid(id)) {
                    logger.log('error', '[business-videoBO] The id informed is not valid on gtById method.', id);
                    reject('The id informed is not valid.');
                }
                videos.findById(id)
                    .exec()
                    .then(function (video) {
                        if (!video) {
                            logger.log('info', '[business-videoBO] No video found');
                        } else {
                            logger.log('warn', '[business-videoBO] video was found');
                        }
                        resolve(video);
                    }, function (erro) {
                        logger.log('error', '[business-videoBO] An error has occurred while geeting a video by id %s', id, erro);
                        reject(erro);
                    });
            });
        },

        update: function (video, toStatusId, user, observation, token) {
            logger.log('info', '[business-videoBO] Start update videoBO.');
            return new Promise(function (resolve, reject) {
                logger.log('info', '[business-videoBO] Updating a video');
                if (toStatusId) {
                    videostatus.getByStatusId(toStatusId)
                        .then(function (status) {
                            executeOptions(video, toStatusId, user, token, status[0])
                                .then(
                                    function (rvideo) {
                                        rvideo.actionHitoric.push(createHistoric(user.userId, user.userName, 'update', toStatusId, rvideo.status.name, new Date(), observation));
                                        rvideo.status = status[0];
                                        updatevideo(rvideo)
                                            .then(resolve, reject);
                                    },
                                    function (error) {
                                        video.actionHitoric.push(createHistoric(user.userId, user.userName, 'update', toStatusId, video.status.name, new Date(), observation));
                                        video.status = status[0];
                                        updatevideo(video)
                                            .then(resolve, reject);
                                    }
                                )
                        })
                        .catch(function (erro) {
                            reject(erro);
                        });
                } else {
                    updatevideo(video)
                        .then(resolve, reject);
                }
            });
        },

        add: function (video) {
            logger.log('info', '[business-videoBO] Start add videoBO.');
            return new Promise(function (resolve, reject) {
                    videos.count({}, function (error, count) {
                        // video["code"] = count + 1;
                        videos.create(video)
                            .then(function (nvideo) {
                                logger.log('info', '[business-videoBO] The video has been added successfully.');
                                resolve(nvideo);
                            }, function (erro) {
                                logger.log('error', '[business-videoBO] An error has ocurred while adding a video.', erro);
                                reject(erro);
                            });
                    })
            });
        },

        delete: function (id) {
            return new Promise(function (resolve, reject) {
                logger.log('info', '[business-videoBO] Deleting the video by id %s', id);

                videos.remove({
                        '_id': id
                    }).exec()
                    .then(function () {
                        logger.log('info', '[business-videoBO] The video has been deleted successfully');
                        resolve();
                    }, function (erro) {
                        logger.log('error', '[business-videoBO] An error has occurred while deleting a video by id %s. Error: %s', id, erro);
                        reject(erro);
                    });
            });
        }
    };
};
