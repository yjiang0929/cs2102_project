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

var sql_query = 'SELECT * FROM Contracts'

var contracts_sname = "UPDATE Contracts SET sname = ";


router.post('/', function(req, res, next){
	var sname = req.session.user;
	var cid = req.body.cid;

	var contracts_update_query = contracts_sname + "'" + sname + "'" +
	" WHERE cid = " + cid;

	pool.query(contracts_update_query, (err, data) => {
		console.log(contracts_update_query)
		console.log(data)
		res.redirect('supervisor_view_my')
	});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;
  if (name==undefined) {
    res.redirect('index');
  } else {

  	pool.query(sql_query, (err, data) => {
    		res.render('supervisor_view_all_contracts', { title: 'CS2102 Project', name:name, data:data.rows });
    });
  }
});

module.exports = router;
