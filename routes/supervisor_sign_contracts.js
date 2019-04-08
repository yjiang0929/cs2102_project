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

var contracts_sid = "UPDATE Contracts SET sid = ";

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(sql_query, (err, data) => {
    res.render('customer_viewtasks', { title: 'CS2102 Project', data:data.rows});
  });
});

router.post('/', function(req, res, next){
	var sid = req.body.sid;
	var tid = req.body.tid;
	var cid = req.body.cid;

	var contracts_update_query = contracts_sid + "(" + sid + ", tid = " + tid + ")" + 
	" WHERE cid = " + cid;

	pool.query(contracts_update_query, (err, data) => {
		res.redirect('/supervisor_index')
	});
});

module.exports = router;
