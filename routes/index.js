var express = require('express');
var router = express.Router();

const { Client } = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', (req, res, next) => {
  let response = [];

  const client = new Client({
    connectionString: 'postgres://tcmspxhwoqamol:9ae24aeff9ca740767e9998fae0de1b1cc7f8ce58ccfbe3231d362031844170e@ec2-52-203-160-194.compute-1.amazonaws.com:5432/de07o47i7qidt1',
    ssl: true,
  });

  client.connect();

  client.query('SELECT * FROM test;', (err, pgRes) => {
    if (err) { console.log('err', err) };

    for (let row of pgRes.rows) {
      console.log(JSON.stringify(row));
    }

    response = pgRes.rows;

    res.json({
      test: 'test',
      rows: response,
    });

    client.end();
  });
});

module.exports = router;
