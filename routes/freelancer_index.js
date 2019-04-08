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

var contact_query = "SELECT * FROM ContactMethods WHERE name='";
var contact_insert = 'INSERT INTO ContactMethods VALUES';
var sql_query = 'SELECT * FROM freelancers'

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;
  var new_contact_query = contact_query + name + "'";

	pool.query(sql_query, (err, data) => {
	pool.query(new_contact_query, (err0, data1) => {   
        res.render('freelancer_index', { title: 'CS2102 Project', name:name, data:data.rows, cdata:data1.rows});
    	});  
	});
});  

router.post('/',function(req, res, next){
  var phonenumber = req.body.phonenumber;
  var areacode = req.body.areacode;
  var name = req.session.user;
});

module.exports = router;
