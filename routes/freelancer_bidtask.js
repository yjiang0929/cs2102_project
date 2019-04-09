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

var sql_query = 'INSERT INTO BidTasks VALUES';

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;
  if (name==undefined) {
    res.redirect('index');
  } else {
    res.render('freelancer_bidtask', { title: 'CS2102 Project', name:name });
  }
});

router.post('/',function(req, res, next){
  var tid = req.body.tid;
  var fname = req.body.fname;
  var bidPrice = req.body.bidPrice;

  var insert_query = sql_query + "(" + tid + ",'" + fname + "','" + bidPrice + ")";

  pool.query(insert_query, (err, data) => {
    res.redirect('/freelancer_bidtask')
  });
});

module.exports = router;
