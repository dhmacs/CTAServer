var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ciao/', function(req, res, next) {
  res.render('index', { title: 'Ciao' });
});

router.get('/jsonp/', function(req, res, next) {
  res.jsonp({ title: 'boh2' });
});

module.exports = router;
