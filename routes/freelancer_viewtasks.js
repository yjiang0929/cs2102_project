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

var sql_query = 'SELECT * FROM tasks'

/* GET home page. */
router.get('/', function(req, res, next) {
	  pool.query(sql_query, (err, data) => {
  res.render('freelancer_viewtasks', { title: 'CS2102 Project', data:data.rows});
	});
});


module.exports = router;