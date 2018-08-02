// var RequestHelper = require('./requestHelper');
var DateHelper = require('./dateHelper');
// var SendMailHelper = require('./sendMailHelper');
// var DynamicTextHelper = require('./dynamicTextHelper');
// var StringReplacerHelper = require('./stringReplacerHelper');
// var UserHelper = require('./userHelper');
// var CCCHelper = require('./cccHelper');
var HashHelper = require('./hashHelper');
// var FeeHelper = require('./feeHelper');
// var CryptoNoteCDALHelper = require('./cryptoNoteCDALHelper');
// var BitcoinCDALHelper = require('./bitcoinCDALHelper');
// var ETHCDALHelper = require('./ethCDALHelper');
var JWTHelper = require('./jwtHelper');
// var MutexHelper = require('./mutexHelper');
// var DecimalHelper = require('./decimalHelper');
// var settings = require('../config/settings');
// var request = require('request');
// var nodemailer = require('nodemailer');
// var mutex = require('node-mutex');

// preventing ERR max number of clients reached from REDIS
// var m = mutex(settings.mutex);

module.exports = {
    getHelper: function (helper, logger) {
        switch (helper) {
            case 'hash':
                return HashHelper;
            // case 'ccc':
            //     return new CCCHelper({
            //         requestHelper: this.getHelper('request', logger)
            //     }, logger);
            // case 'mutex':
            //     return new MutexHelper({
            //         mutex: mutex(m)
            //     }, logger);
            // case 'request':
            //     return new RequestHelper({
            //         request: request
            //     }, logger);
            // case 'decimal':
            //     return new DecimalHelper(logger);
            // case 'fee':
            //     return new FeeHelper(logger);
            // case 'cryptonote-cdal':
            //     return new CryptoNoteCDALHelper({
            //         requestHelper: this.getHelper('request', logger)
            //     }, logger);
            // case 'bitcoin-cdal':
            //     return new BitcoinCDALHelper({
            //         requestHelper: this.getHelper('request', logger)
            //     }, logger);
            // case 'eth-cdal':
            //     return new ETHCDALHelper({
            //         requestHelper: this.getHelper('request', logger)
            //     }, logger);
            case 'date':
                return new DateHelper(logger);
            // case 'sendMail':
            //     return new SendMailHelper({
            //         nodemailer: nodemailer
            //     }, logger);
            // case 'stringReplacer':
            //     return new StringReplacerHelper(logger);
            // case 'user':
            //     return new UserHelper(logger);
            case 'jwt':
                return new JWTHelper(logger);
            // case 'dynamicText':
            //     return new DynamicTextHelper({
            //         stringReplacerHelper: this.getHelper('stringReplacer', logger)
            //     }, logger);
            default:
                return null;
        }
    }
};