var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('freelancer_viewtasks', { title: 'CS2102 Project' });
});

module.exports = router;
