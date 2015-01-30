var express = require('express');
var pg = require('pg');
var DATABASE_URL = 'postgres://mzbciewxfguoad:XwdC3c96EQvT9kEksokj1JDvn8@ec2-184-73-165-193.compute-1.amazonaws.com:5432/df78k0v3mkb016';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CTA data feed' });
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
  });

  res.jsonp({ result: "ok"});
});

router.get('/insert/', function(req, res, next) {
  var result;
  pg.connect(DATABASE_URL, function(err, client) {
    var queryText = "INSERT INTO example VALUES('CIAO')";
    var query = client.query(queryText);

  });

  res.jsonp({ result: "ok"});
});

router.get('/view/', function(req, res, next) {
  var result = [];
  pg.connect(DATABASE_URL, function(err, client) {
      var queryText = "select * from example";
      //var query = client.query(queryText);

      client.query('SELECT * FROM example', function(err, result) {
          //done();
          if(err) return res.send(err);

          res.send(result.rows);
      });
  });
});

/*
router.post('/upload', function(req, res) {

  //req.form.on('end', function() {
  res.send(req);
  //)});

});*/

module.exports = router;
