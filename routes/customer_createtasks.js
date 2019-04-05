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

var sql_query = 'INSERT INTO tasks VALUES';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('customer_createtasks', { title: 'CS2102 Project' });
});

router.post('/',function(req, res, next){
  console.error('message');
  var tid = req.body.tid;
  var description = req.body.description;
  var tdate = req.body.tdate;
  var lid = req.body.lid;
  var specid = req.body.specid;
  var cname = "'man'"

  var insert_query = sql_query + "(" + tid + ",'" + description + "','" + tdate + "'," + lid + "," + specid + "," + cname + ")";

  pool.query(insert_query, (err, data) => {
    res.redirect('/customer_createtasks')
  });
});

module.exports = router;
