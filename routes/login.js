var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'cs2102',
  password:'********',
  port:5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'CS2102 Project' });
});

router.post('/',function(req, res, next){
  var username = req.body.username,
      password = req.body.password,
      role = req.body.role;

  if (role=='customer'){
    var customer_query = "SELECT * FROM customers WHERE cname='" + username + "'";

    pool.query(customer_query, (err, data) => {
      if (data.rows[0]!=undefined && data.rows[0].password==password) {
        req.session.user = username;
        res.redirect('customer_index');
      } else {
        res.redirect('login');
      }
    });
  } else if (role=='freelancer'){
    var freelancer_query = "SELECT * FROM freelancers WHERE fname='" + username + "'";

    pool.query(freelancer_query, (err, data) => {
      if (data.rows[0]!=undefined && data.rows[0].password==password) {
        req.session.user = username;
        res.redirect('freelancer_index');
      } else {
        res.redirect('login');
      }
    });
  } else if (role=='supervisor'){
    var supervisor_query = "SELECT * FROM supervisors WHERE sname='" + username + "'";

    pool.query(supervisor_query, (err, data) => {
      if (data.rows[0]!=undefined && data.rows[0].password==password) {
        req.session.user = username;
        res.redirect('index_supervisor');
      } else {
        res.redirect('login');
      }
    });
  }

});

module.exports = router;
