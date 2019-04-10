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
var loc_insert = "INSERT INTO locations VALUES";
var spec_insert = "INSERT INTO specializations VALUES";

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user
  if (name==undefined) {
    res.redirect('index');
  } else {
    pool.query(loc_query, (err, data) => {
      pool.query(spec_query, (err0, data0) => {
        res.render('supervisor_viewproperties', { title: 'CS2102 Project', name:name, ldata:data.rows, sdata:data0.rows});
    }); });
  }
});

router.post('/',function(req,res,next){
  var lid = req.body.lid;
  var city = req.body.city;
  var country = req.body.country;
  var specid = req.body.specid;
  var difficultylevel = req.body.difficultylevel;
  var category = req.body.category;
  var name = req.session.user;

  if (specid!=undefined){
    var spec_insert_query = spec_insert + "("+specid + "," + difficultylevel + ",'" +category +"');";

    pool.query(spec_insert_query, (err, spec_data) => {
      pool.query(loc_query, (err, data) => {
        pool.query(spec_query, (err0, data0) => {
          res.render('supervisor_viewproperties', { title: 'CS2102 Project', name:name, ldata:data.rows, sdata:data0.rows});
    }); }); });
  } else if (lid!=undefined){
    var loc_insert_query = loc_insert + "(" + lid + ",'"+ city + "','"+country + "');";
    pool.query(loc_insert_query, (err, spec_data) => {
      pool.query(loc_query, (err, data) => {
        pool.query(spec_query, (err0, data0) => {
          res.render('supervisor_viewproperties', { title: 'CS2102 Project', name:name, ldata:data.rows, sdata:data0.rows});
    }); }); });
  } else {
    pool.query(loc_query, (err, data) => {
      pool.query(spec_query, (err0, data0) => {
        res.render('supervisor_viewproperties', { title: 'CS2102 Project', name:name, ldata:data.rows, sdata:data0.rows});
  }); });
  }

})

module.exports = router;
