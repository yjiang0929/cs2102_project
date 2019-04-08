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

var sql_query = 'SELECT * FROM tasks'

/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.session.user;

  pool.query(sql_query, (err, data) => {
    res.render('freelancer_viewtasks', { title: 'CS2102 Project', name: name, data:data.rows});
	});
});

var insert_query = 'INSERT INTO BidTasks VALUES';

router.post('/',function(req, res, next){
  var name = req.session.user;
  var tid = req.body.tid;
  var fname = name;
  var bidPrice = req.body.bidPrice;

  var new_insert_query = insert_query + "(" + tid + ",'" + fname + "'," + bidPrice + ")";

  pool.query(new_insert_query, (err, data) => {
    res.redirect('/freelancer_bidtask')
  });
});


module.exports = router;
