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

var complex_query1 = "select lid, city, country, count(*) as taskCount from tasks natural join locations group by (lid,city, country);";
var complex_query2 = "select specid, difficultylevel, category, count(*) as taskcount from tasks natural join specializations group by (specid, difficultylevel, category);";
var complex_query3 = "select fname, sum(payamount) as totalearning from contracts group by fname order by totalearning;";

/* GET home page. */
router.get('/', function(req, res, next) {
	var name = req.session.user;
  if (name==undefined) {
    res.redirect('index');
  } else {
    	pool.query(complex_query1, (err1, data1) => {
        pool.query(complex_query2, (err2, data2) => {
          pool.query(complex_query3, (err3, data3) => {
            console.log(data1)
        		res.render('supervisor_viewstats', { title: 'CS2102 Project', name:name, data1:data1.rows, data2:data2.rows, data3:data3.rows });
    	});  });  });
    }
});

module.exports = router;
