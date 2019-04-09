var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
// const pool = new Pool({
//   user:'postgres',
//   host:'localhost',
//   database:'cs2102',
//   password:'********',
//   port:5432,
// })
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'CS2102 Project' });
});

router.post('/',function(req, res, next){
  if (req.body.password != req.body.repeatPassword) {
    res.redirect('register');
  } else {
    var username = req.body.username,
        password = req.body.password,
        firstname = req.body.firstname,
        lastname = req.body.lastname,
        gender = req.body.gender,
        role = req.body.role;

    if (role=='customer'){
      var customer_insert = "INSERT INTO customers VALUES ('" + username + "', '" + firstname + "', '" +lastname + "', '" + gender + "', '" + password + "');"
      console.log(customer_insert)

      pool.query(customer_insert, (err, data) => {
        res.redirect('login');
      });
    } else if (role=='freelancer'){
      var freelancer_insert = "INSERT INTO freelancers VALUES ('" + username + "', '" + firstname + "', '" + lastname + "', '" + gender + "', '" + password + "', null);"

      pool.query(freelancer_insert, (err, data) => {
        res.redirect('login');
      })
    }

  }
});

module.exports = router;
