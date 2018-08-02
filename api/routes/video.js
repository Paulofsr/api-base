module.exports = function (app) {
    var controller = app.controllers.video;

    app.route('/v1/videos')
        .get(controller.getAll)
        .post(controller.add);

    app.route('/v1/videos/:id')
        .get(controller.getById)
        .put(controller.update)
        .post(controller.update)
        .delete(controller.delete);
}