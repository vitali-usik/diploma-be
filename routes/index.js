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
    connectionString: process.env.PG_DATABASE_URL,
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
