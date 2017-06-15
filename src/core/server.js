const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();

var ph = require('./PetitionHandler');
var ftpw = require('./FTPwrapper');
var tools = require('./utils');
var config = require("../../config.json");

var petition_handler = new ph(config.packet_limit);
ftpw.init(petition_handler, config.provider);

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/form', (req, res) => {
    console.log("generando peticion...");
    petition_handler.add_petition((req.body));
    return true;
});

app.get('/api/getData', (req, res, next) => {
  const name = req.query.data;
  const type= req.query.type;
  if (!name) {
    res.json({
      error: 'Missing required parameter `data`',
    });
    return;
  }
  petition_handler.searchOne(function(dataRes){
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
    ftpw.exec(ftpw.action.flush);
    res.redirect('http://localhost:3000/test')
});

app.get('/api/pull', (req, res, next) => {
    ftpw.exec(ftpw.action.pull);
    res.redirect('http://localhost:3000/test')
});

app.get('/api/fetch', (req, res, next) => {
    ftpw.exec(ftpw.action.fetch);
    res.redirect('http://localhost:3000/test')
});

app.get('/api/push', (req, res, next) =>{
    ftpw.exec(ftpw.action.push);
    res.redirect('http://localhost:3000/test')
});

app.get('/api/generate', (req, res, next)=>{
    var dict = ["hitler", "africa", "madrid", "barcelona", "obama", "nadal", "opennebula", "arkano", "segovia", "mcdonald", "navidad", "microsoft", "google", "apple", "ebro", "extremoduro", "amazonas"];  

	var petition = {};
	var rand = tools.random(0, dict.length-1);
	petition.search = dict[rand];
	petition.type = "wiki";
	petition.num = 1;
	petition_handler.add_petition(JSON.stringify(petition));
    res.redirect('http://localhost:3000/test')
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});



