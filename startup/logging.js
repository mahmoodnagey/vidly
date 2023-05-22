const winston = require('winston');
require('express-async-errors');

module.exports = function () {
    
    // winston.handleExceptions(
    //     new winston.transports.File
    // )
    
    // Handling unhandled / uncaght exceptions
    // process.on('uncaughtException', (ex) => {
    //     console.log('WE GOT AN UNCAGHT EXCEPTION');
    //     winston.error(ex.message, ex);
    // });

    // Handling unhandled Promise Rejections
    // process.on('unhandledRejection', (ex) => {
    //     console.log('WE GOT AN UNHANDLED EXCEPTION');
    //     winston.error(ex.message, ex);
    // });

    // winston.add(winston.transports.File, {filename: 'logfile.log'});
}