const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');
const bodyParser = require("body-parser");

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

var ph = require('./PetitionHandler');
var ftpw = require('./FTPwrapper');

//In the future we would organize statics values such as Npetition, remote_ip, hour...
var petition_handler = new ph(2);



app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


const COLUMNS = [
  'carbohydrate_g',
  'protein_g',
  'fa_sat_g',
  'fa_mono_g',
  'fa_poly_g',
  'kcal',
  'description',
];

app.get('/api/petition', (req, res) => {

  var petition_hander = new ph(1);

  for (var i = 0, len = 1; i < len; i++){
    var prueba = "prueba";
    petition_hander.add_petition(prueba);

  }

  ftpw.exec(ftpw.action.push);


});

app.post('/api/form', (req, res) => {

    res.json(
    {
      "name" : "prueba",
      "content" : "<h1> Prueba </h1>",
      "links" : ['link', 'link2']
    });

    petition_handler.add_petition(req.body.search);
    ftpw.exec(ftpw.action.push);

    return res;
});



app.get('/api/food', (req, res) => {
  const param = req.query.data;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(`
    select ${COLUMNS.join(', ')} from entries
    where description like '%${param}%'
    limit 100
  `);

  if (r[0]) {
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
  }
});




app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console

 /*
  var petition_hander = new ph(1);

  for (var i = 0, len = 1; i < len; i++){
    var prueba = "prueba";
    petition_hander.add_petition(prueba);

  }

  ftpw.exec(ftpw.action.push);
*/

});



function test(){


  ftpw.exec(ftpw.action.push);

}
