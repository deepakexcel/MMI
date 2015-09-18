var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var stormpath = require('express-stormpath');
//var stormpathExpressSdk = require('stormpath-sdk-express');

var app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    if ('OPTIONS' === req.method) {
        res.status(204).send();
    }
    else {
        next();
    }
});

app.use(stormpath.init(app, {
    // Optional configuration options.
    api: true,
    website : true,
    apiKey : {
        id: '58E0H0QSC828NLK7VIGS2JAAE',
        secret: '8DLV0O6UJE/aL0GAh39pst1Ao5AKx6iPyBdvY5c2H6k'
    },
    application: {
        href: 'https://api.stormpath.com/v1/applications/cEUUEPrYJ0qOKSyeqgo3e',
    },
    'apiKey.id': '58E0H0QSC828NLK7VIGS2JAAE',
    'apiKey.secret': '8DLV0O6UJE/aL0GAh39pst1Ao5AKx6iPyBdvY5c2H6k',
    'appHref': 'http://127.0.0.1/new_project/app'
}));

app.on('stormpath.ready', function () {
    console.log('storm path ready');
});

app.get('/secret', function (req, res) {
    var client = req.app.get('stormpathClient');

    // For example purposes only -- you probably don't want to actually expose
    // this information to your users =)
    client.getCurrentTenant(function (err, tenant) {
        if (err) {
            return res.status(400).json(err);
        }

        res.json(tenant);
    });
});

app.use(cookieParser());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));

//var spMiddleware = stormpathExpressSdk.createMiddleware({
//    apiKeyId: '58E0H0QSC828NLK7VIGS2JAAE',
//    apiKeySecret: '8DLV0O6UJE/aL0GAh39pst1Ao5AKx6iPyBdvY5c2H6k',
//    appHref: 'http://127.0.0.1/new_project/app'
//});
//spMiddleware.attachDefaults(app);
//app.use(spMiddleware.authenticate);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
