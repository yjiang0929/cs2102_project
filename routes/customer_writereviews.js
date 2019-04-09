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

var sql_query = 'INSERT INTO reviews VALUES ';

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user
  if (name==undefined) {
    res.redirect('index');
  } else {
    res.render('customer_writereviews', { title: 'CS2102 Project', name:name});
  }
});

router.post('/',function(req, res, next){
  var fname = req.body.fname;
  var rdate = req.body.rdate;
  var review = req.body.review;
  var rating = req.body.rating;
  var name = req.session.user;

  var insert_query = sql_query + "('" + name + "','" + fname + "'," + rating + ",'" + review + "','" + rdate + "')";

  pool.query(insert_query, (err, data) => {
    res.redirect('/customer_writereviews');
  });
});


module.exports = router;
