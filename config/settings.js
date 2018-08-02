
var util = require('util');

module.exports = {
    mongoUrl: util.format('mongodb://%s/ms-videos', process.env.DB || 'localhost'),
    servicePort: process.env.PORT || 5300,
    isMongoDebug: true,
    logging: {
        consoleLevel: process.env.LOGGING_CONSOLE_LEVEL || 'debug',
        fileLevel: process.env.LOGGING_FILE_LEVEL || 'debug',
        dbLebel: process.env.LOGGING_DB_LEVEL || 'debug',
        useDB: process.env.LOGGING_USE_DB === 'true',
        saveRequests: process.env.LOGGING_SAVE_REQUESTS === 'false'
    },
    jwt: {
        secret: process.env.SECRET_KEY || 'secret',
        expiresIn: '1h'
    }
};