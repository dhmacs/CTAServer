var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var pg = require('pg');
var DATABASE_URL = 'postgres://mzbciewxfguoad:XwdC3c96EQvT9kEksokj1JDvn8@ec2-184-73-165-193.compute-1.amazonaws.com:5432/df78k0v3mkb016';

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// CSV
var multer = require('multer');
var csv = require("fast-csv");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: "./uploads/"}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/routes',[ multer({ dest: './uploads/'}), function(req, res){
    console.log(req.body); // form fields
    console.log(req.files); // form files

    var content = [];

    pg.connect(DATABASE_URL, function(err, client) {
        //res.send(req.files.groupfile.path);

        var queryText = "INSERT INTO Routes VALUES($1,$2,$3,$4,$5,$6,$7)";
        //var query = client.query(queryText);

        csv
            .fromPath(req.files.groupfile.path, {headers: true})
            .on("data", function(data){
                //content.push(data);
                /*
                client.query(queryText, [data["route_id"], data["route_short_name"], data["route_long_name"], data["route_type"],
                    data["route_url"], data["route_color"], data["route_text_color"]]);*/

            })
            .on("end", function(){
                //res.send("done");
                res.send("done");
            });
    });

    //res.send(req.files);
    //res.status(204).end()
}]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


module.exports = app;
