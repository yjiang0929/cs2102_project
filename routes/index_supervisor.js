var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_supervisor', { title: 'CS2102 Project' });
});

module.exports = router;
