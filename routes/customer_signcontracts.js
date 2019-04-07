var express = require('express');
var router = express.Router();
var url = require('url');

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cs2102',
  password: '********',
  port: 5432,
})

var contract_insert = "INSERT INTO contracts VALUES";

/* GET home page. */
router.get('/', function(req, res, next) {
  var tid = req.query.tid;
  var sql_query = 'SELECT * FROM bidtasks WHERE tid=' + tid

  pool.query(sql_query, (err, data) => {
    res.render('customer_signcontracts', { title: 'CS2102 Project', data:data.rows});
  });
});

router.post('/',function(req, res, next){
  var cid = req.body.cid;
  var fname = req.body.fname;
  var tid = "2";
  var date = "'20190201'";
  var payamount = "100";
  var cname = "'man'";

  var contract_insert_query = contract_insert + "(" + cid + "," + date + "," + payamount + "," + tid + ",'" + fname + "'," + cname + ")";

  pool.query(contract_insert_query, (err, data) => {
    res.redirect('/customer_index')
  });
});

module.exports = router;
