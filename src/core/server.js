const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');
const bodyParser = require("body-parser");

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

var ph = require('./PetitionHandler');
var ftpw = require('./FTPwrapper');

var tools = require('./utils');

//In the future we would organize statics values such as Npetition, remote_ip, hour...
var petition_handler = new ph(2);



app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/form', (req, res) => {
    petition_handler.add_petition((req.body));
    
    console.log("generando peticion...");
    ftpw.exec(ftpw.action.push);
    return true;
});

app.get('/api/search', (req, res) => {
  const param = req.query.data;
  const type = req.query.type;

  if (!param) {
    res.json({
      error: 'Missing required parameter `data`',
    });
    return;
  }
  var json = petition_handler.search(function(dataRes){
    console.log(dataRes);
    return res.json(dataRes);
  },param, type);
  /*if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = (
              parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
            ).toFixed(2);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }*/
});




app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console



});



