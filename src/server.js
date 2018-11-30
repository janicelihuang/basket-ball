const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
var app = express();
const Pool = require('pg').Pool;
const port = process.env.PORT || 5000;
var url = require('url');

const pool = new Pool({
  user: 'janice',
  host: 'localhost',
  database: 'postgres',
  password: 'monkey123',
  port: 5433,
})

var scoremap = {};

app.post('/api/basicsetup', function (req, res) {
  var result = [];
  pool.query('DELETE FROM "basicstats"');
  fs.createReadStream('basic_gbyg_sentiment.csv')
    .pipe(csv())
    .on('data', (blah) => {
      result.push(blah);
    })
    .on('end', () => {
      for (var i = 0; i < result.length; i++) {
        pool.query('INSERT INTO "basicstats" (basicstats_id, name, date, team, opposition, winmargin, fgm, fgpct, tpm, tppct, ftm, ftpct, offreb, defreb, assists, steals, blocks, turnovers, points, twt) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)', [i, result[i].Name, result[i].Date, result[i].Tm, result[i].Opp, 0, result[i].FG, result[i]['FG%'], result[i]['3P'], result[i]['3P%'], result[i].FT, result[i]['FT%'], result[i].ORB, result[i].DRB, result[i].AST, result[i].STL, result[i].BLK, result[i].TOV, result[i].PTS, result[i].twt], (error, rs) => {
          if (error) {
            console.log(error)
          }
        });
      }
      res.status(200);
      res.send("Successfully inserted " + result.length + " rows");
    });
});

app.post('/api/advancedsetup', function(req, res) {
  var result = []
  fs.createReadStream('adv_gbyg.csv')
    .pipe(csv())
    .on('data', (blah) => {
      result.push(blah);
    })
    .on('end', () => {
      for (var i = 0; i < result.length; i++) {
        pool.query('INSERT INTO "advancedstats" (advanced_id, name, date, ts, efg, orbpct, drbpct, trbpct, astpct, stlpct, blkpct, tovpct, usgpct, ortg, drtg, gamescore) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', [i, result[i].Name, result[i].Date, result[i]['TS%'], result[i]['eFG%'], result[i]['ORB%'], result[i]['DRB%'], result[i]['TRB%'], result[i]['AST%'], result[i]['STL%'], result[i]['BLK%'], result[i]['TOV%'], result[i]['USG%'], result[i].ORtg, result[i].DRtg, result[i].GmSc], (error, rs) => {
          if (error) {
            console.log(error)
          }
        });
      }
      res.status(200);
      res.send("Successfully inserted " + result.length + " rows");
    });
});

app.get('/api/basicquery', function (req, res) {
  pool.query('SELECT * FROM "basicstats";', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.get('/api/search', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var c1 = '%' + query.name + '%';
  var c2 = '%' + query.team + '%';
  var c3 = '%' + query.opp + '%';
  pool.query('SELECT * FROM "advancedstats" INNER JOIN "basicstats" ON advancedstats.name = basicstats.name and advancedstats.date = basicstats.date WHERE basicstats.name LIKE $1 and basicstats.team LIKE $2 and basicstats.opposition LIKE $3', [c1, c2, c3], (error, results) => {
    if (error)
      throw error;
    res.status(200).json(results.rows)
  })
});

app.get('/api/advancedquery', function (req, res) {
  pool.query('SELECT * FROM "advancedstats";', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.get('/api/search', function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var c1 = '%' + query.name + '%';
  var c2 = '%' + query.team + '%';
  var c3 = '%' + query.opp + '%';
  pool.query('SELECT * FROM "advancedstats" INNER JOIN "basicstats" ON advancedstats.name = basicstats.name and advancedstats.date = basicstats.date WHERE basicstats.name LIKE $1 and basicstats.team LIKE $2 and basicstats.opposition LIKE $3', [c1, c2, c3], (error, results) => {
    if (error)
      throw error;
    res.status(200).json(results.rows)
  })
});

app.get('/api/advancedquery', function (req, res) {
  pool.query('SELECT * FROM "advancedstats";', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.get('/api/rankplayers', function(req, res) {
  pool.query('SELECT * FROM "basicstats"', (error, results) => {
    if (error)
      throw error;
    for (row of results.rows) {
      points = row.points;
      if (row.name in scoremap) {
        scoremap[row.name] += points;
      }
      else {
        scoremap[row.name] = points;
      }
    }
    res.send(scoremap);
  });
});

app.listen(8080, () => console.log("Listening on port 8080"));