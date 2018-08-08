module.exports = function (app) {
    var controller = app.controllers.user;

    app.route('/v1/users')
        .get(controller.getAll)
        .post(controller.add);

    app.route('/v1/users/:id')
        .get(controller.getById)
        .put(controller.update)
        .delete(controller.delete);
}