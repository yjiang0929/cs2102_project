var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cs2102',
  password: '********',
  port: 5432,
})

var sql_query = "SELECT * FROM reviews WHERE cname = '"

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user

  var new_query = sql_query + name + "'";
  pool.query(new_query, (err, data) => {
    res.render('customer_myreviews', { title: 'CS2102 Project', name:name, data:data.rows});
  });
});

module.exports = router;
