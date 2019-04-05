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

var contract_query = 'SELECT * FROM contracts'

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(contract_query, (err, data) => {
    res.render('customer_index', { title: 'CS2102 Project', data:data.rows});
  });
});

module.exports = router;
