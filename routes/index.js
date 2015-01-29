var express = require('express');
var pg = require('pg');
var DATABASE_URL = 'postgres://mzbciewxfguoad:XwdC3c96EQvT9kEksokj1JDvn8@ec2-184-73-165-193.compute-1.amazonaws.com:5432/df78k0v3mkb016';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ciao/', function(req, res, next) {
  res.render('index', { title: 'Ciao' });
});

router.get('/jsonp/', function(req, res, next) {
  var result;
  pg.connect(DATABASE_URL, function(err, client) {
    var query = client.query('SELECT * FROM your_table');

    query.on('row', function(row) {
      console.log(JSON.stringify(row));
    });
  });

  res.jsonp({ result: 'boh2' });
});

router.get('/create/', function(req, res, next) {
  var result;
  pg.connect(DATABASE_URL, function(err, client) {
    var query = client.query('CREATE TABLE example(greet varchar(255))');

    /*
    query.on('row', function(row) {
      console.log(JSON.stringify(row));
    });*/
  });

  res.jsonp({ result: "ok"});
});

module.exports = router;
