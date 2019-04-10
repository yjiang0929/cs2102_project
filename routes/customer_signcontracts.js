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
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// })

var contract_insert = "INSERT INTO contracts VALUES";
var tid;

/* GET home page. */
router.get('/', function(req, res, next) {
  tid = req.query.tid;
  var name = req.session.user;
  if (name==undefined) {
    res.redirect('index');
  } else {
    var sql_query = "SELECT * FROM bidtasks WHERE tid=" + tid

    pool.query(sql_query, (err, data) => {
      res.render('customer_signcontracts', { title: 'CS2102 Project', name:name, data:data.rows});
    });
  }
});

router.post('/',function(req, res, next){
  var cid = req.body.cid;
  var fname = req.body.fname;
  var payamount = req.body.amount;
  var cname = req.session.user;
  var find_date_query = "SELECT * FROM tasks WHERE tid=" + tid + " and cname='" + cname + "'";

  pool.query(find_date_query, (err,data) => {
    var date = data.rows[0].tdate;
    var address = data.rows[0].address;
    var contract_insert_query = contract_insert + "(" + cid + ",'" + date + "'," + payamount + "," + tid + ",'" + fname + "','" + cname + "', '" + address + "')";

    pool.query(contract_insert_query, (err0, data0) => {
      res.redirect('/customer_index')
    });
  });
});

module.exports = router;
