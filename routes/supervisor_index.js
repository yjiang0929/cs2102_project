var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;

  res.render('supervisor_index', { title: 'CS2102 Project', name:name});
});

module.exports = router;
