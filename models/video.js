var mongoose = require('mongoose');

var model = null;

module.exports = function () {

    var Video = mongoose.Schema({
        href: { type: String, require: true },
        user: {
            userId: { type: String, require: true },
            name: { type: String, require: true },
            photo: { data: Buffer, contentType: String }
        },
        videoInfo: {
            title: { type: String, require: true },
            description: { type: String, require: true },
            href: { type: String, require: true },
            created: { type: Date, require: true }
        }
    });

    model = model ? model : mongoose.model('Videos', Video);

    return model;
};