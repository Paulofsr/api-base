var http        = require('http');
var app         = require('./config/express')();
                  require('./config/database.js')();
var settings    = require('./config/settings');
var Logger      = require('./config/logger');


var server = http.createServer(app).listen(app.get('port'), function() {
    var logger = new Logger(settings);
    logger.info('Server is running on port ' + app.get('port') + '');
});

module.exports = server;