'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression')
var cors = require('cors');
var responseTime = require('response-time');

var mindRouter = require('./routes/markmap');
var healthRouter = require('./routes/health');

var app = express();

// add for cors
app.use(cors())
// add gzip compression
app.use(compression());
app.use(responseTime());

// to determine if the response should be compressed
const shouldCompress = (req, res) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
    // Add any additional checks or conditions here
    return true; // or false
};
app.use(compression({filter: shouldCompress}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1/mindmap/generate', mindRouter);
app.use('/health', healthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    'use strict'

    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var compression = require('compression');
    var cors = require('cors');
    var responseTime = require('response-time')
    var mindRouter = require('./routes/markmap');

    var app = express();

// add for cors
    app.use(cors());
    app.use(responseTime());


// to determine if the response should be compressed
    const shouldCompress = (req, res) => {
        console.log(`Request URL: ${req.url}`);
        console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Response Content-Type: ${res.getHeader('Content-Type')}`);
        console.log(`Response Content-Length: ${res.getHeader('Content-Length')}`);
        // Add any additional checks or conditions here
        return true; // or false
    };

    app.use(compression({filter: shouldCompress}));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use('/render', mindRouter);

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    module.exports = app;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
