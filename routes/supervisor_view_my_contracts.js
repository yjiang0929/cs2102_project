var express = require('express');
var router = express.Router();


const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'cs2102',
//   password: '********',
//   port: 5432,
// })
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

var sql_query = "SELECT * FROM Contracts where sname = '";

/* GET home page. */
router.get('/', function(req, res, next) {
	var name = req.session.user;
  if (name==undefined) {
    res.redirect('index');
  } else {
    	var sql_query_where = sql_query + name + "'";

    	pool.query(sql_query_where, (err, data) => {
      		res.render('supervisor_view_my_contracts', { title: 'CS2102 Project', name:name, data:data.rows });
    	});
    }
});

module.exports = router;
