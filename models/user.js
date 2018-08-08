var mongoose = require('mongoose');

var model = null;

module.exports = function () {

    var User = mongoose.Schema({
        name: { type: String, require: true },
        email: { type: String }
    });

    model = model ? model : mongoose.model('Users', User);

    return model;
};