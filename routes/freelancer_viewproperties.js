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

var loc_query = "SELECT * FROM locations";
var spec_query = "SELECT * FROM specializations";

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user
  if (name==undefined) {
    res.redirect('index');
  } else {
    pool.query(loc_query, (err, data) => {
      pool.query(spec_query, (errs, datas) => {
        res.render('freelancer_viewproperties', { title: 'CS2102 Project', name:name, data:data.rows, datas:datas.rows});
    }); });
  }
});

module.exports = router;
