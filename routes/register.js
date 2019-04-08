var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'cs2102',
  password:'********',
  port:5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'CS2102 Project' });
});

router.post('/',function(req, res, next){
  if (req.body.password != req.body.repeatPassword) {
    res.redirect('register');
  } else {
    var username = req.body.username,
        password = req.body.password,
        firstname = req.body.firstname;
  }
});

module.exports = router;
