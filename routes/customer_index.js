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

var contract_query = 'SELECT * FROM contracts';
var contact_query = 'SELECT * FROM ContactMethods';
var payment_query = 'SELECT * FROM PaymentMethods';
var contact_insert = 'INSERT INTO ContactMethods VALUES';
var payment_insert = 'INSERT INTO PaymentMethods VALUES';

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(contract_query, (err, data) => {
    pool.query(contact_query, (err0, data0) => {
        pool.query(payment_query, (err0, data1) => {
          res.render('customer_index', { title: 'CS2102 Project', data:data.rows, cdata:data0.rows, pdata:data1.rows});
    });  });  });
});

router.post('/',function(req, res, next){
  var phonenumber = req.body.phonenumber;
  var areacode = req.body.areacode;
  var cardnumber = req.body.cardnumber;
  var expdate = req.body.expdate;
  var currency = req.body.currency;
  var name = "'man'"

  if (cardnumber==undefined) {
    var contact_insert_query = contact_insert + "(" + name + ",'" + phonenumber + "','" + areacode + "')";

    pool.query(contact_insert_query, (err, ins_data) => {
      pool.query(contract_query, (err, data) => {
        pool.query(contact_query, (err0, data0) => {
          pool.query(payment_query, (err0, data1) => {
            res.render('customer_index', { title: 'CS2102 Project', data:data.rows, cdata:data0.rows, pdata:data1.rows});
          });
        });
      });
    });
  } else if (phonenumber==undefined) {
    var payment_insert_query = payment_insert + "('" + cardnumber + "','" + expdate + "','" + currency + "'," + name + ")";

    pool.query(payment_insert_query, (err, ins_data) => {
      pool.query(contract_query, (err, data) => {
        pool.query(contact_query, (err0, data0) => {
          pool.query(payment_query, (err0, data1) => {
            res.render('customer_index', { title: 'CS2102 Project', data:data.rows, cdata:data0.rows, pdata:data1.rows});
          });
        });
      });
    });
  }

});

module.exports = router;
