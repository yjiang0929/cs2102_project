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
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// })

var contact_query = "SELECT * FROM ContactMethods WHERE name='";
var contact_insert = 'INSERT INTO ContactMethods VALUES';
var sql_query = "SELECT * FROM freelancers WHERE fname='"

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;

  if (name==undefined) {
    res.redirect('index');
  } else {
    var new_contact_query = contact_query + name + "'";
    var new_sql_query = sql_query + name + "'";

  	pool.query(new_sql_query, (err, data) => {
  	pool.query(new_contact_query, (err0, data1) => {
          res.render('freelancer_index', { title: 'CS2102 Project', name:name, data:data.rows, cdata:data1.rows});
      	});
  	});
  }
});

router.post('/',function(req, res, next){

  var phonenumber = req.body.phonenumber;
  var areacode = req.body.areacode;
  var name = req.session.user;  
  var new_contact_insert = contact_insert + "('" + name + "','" + phonenumber + "','" + areacode + "')";
  pool.query(new_contact_insert, (err, data) => {
    res.redirect('/freelancer_index')
  });
});

module.exports = router;
