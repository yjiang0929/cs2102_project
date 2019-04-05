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

/* GET home page. */
router.get('/', function(req, res, next) {
  let tid = req.query.tid;
  var sql_query = 'SELECT * FROM bidtasks WHERE tid=' + tid
  console.log(sql_query);

  pool.query(sql_query, (err, data) => {
    res.render('customer_signcontracts', { title: 'CS2102 Project', data:data.rows});
  });
});
module.exports = router;
