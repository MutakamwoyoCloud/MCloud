const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express();

var ph = require('./PetitionHandler');
var ftpw = require('./FTPwrapper');

var tools = require('./utils');

var petition_handler = new ph(2);
ftpw.init(petition_handler);


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

app.get('/api/getData', (req, res, next) => {
  const name = req.query.data;
  const type= req.query.type;
  console.log(name);
  if (!name) {
    res.json({
      error: 'Missing required parameter `data`',
    });
    return;
  }
  petition_handler.searchOne(function(dataRes){
    console.log(dataRes);
    res.send(dataRes);
  },name, type);
});

app.get('/api/search', (req, res, next) => {
  const param = req.query.data;
  const type = req.query.type;

  if (!param) {
    res.json({
      error: 'Missing required parameter `data`',
    });
    return;
  }
  petition_handler.search(function(dataRes){
    res.send(dataRes);
    next();
  },param, type);
});

app.get('/api/flush', (req, res, next) => {
  console.log("flush")
  ftpw.exec(ftpw.action.flush);
  return false;
});

app.get('/api/pull', (req, res, next) => {
  ftpw.exec(ftpw.action.pull);
  return false;
});

app.get('/api/fetch', (req, res, next) => {
  ftpw.exec(ftpw.action.fetch);
  return false;
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});



