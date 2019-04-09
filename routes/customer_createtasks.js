var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
// const pool = new Pool({
//   user:'postgres',
//   host:'localhost',
//   database:'cs2102',
//   password:'********',
//   port:5432,
// })
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

var sql_query = 'INSERT INTO tasks VALUES';

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user
  if (name==undefined) {
    res.redirect('index');
  } else {
    res.render('customer_createtasks', { title: 'CS2102 Project', name:name });
  }
});

router.post('/',function(req, res, next){
  var tid = req.body.tid;
  var description = req.body.description;
  var tdate = req.body.tdate;
  var lid = req.body.lid;
  var specid = req.body.specid;
  var name = req.session.user

  var insert_query = sql_query + "(" + tid + ",'" + description + "','" + tdate + "'," + lid + "," + specid + ",'" + name + "')";

  pool.query(insert_query, (err, data) => {
    res.redirect('/customer_createtasks')
  });
});

module.exports = router;
