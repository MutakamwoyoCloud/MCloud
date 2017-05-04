const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express();

var ph = require('./PetitionHandler');
var ftpw = require('./FTPwrapper');

var tools = require('./utils');

var petition_handler = new ph(2);

var schedule = require('node-schedule');
var executeJobTime = undefined;
var time = {};
  time.hour = 22;
  time.minute = 0;
var timeFinish = {};
  timeFinish.hour = 7;
  timeFinish.minute = 0;
schedule.scheduleJob(time, function(){
  ftpw.exec(ftpw.action.push);
  executeJobTime = setTimeout(function(){ 
    ftpw.exec(ftpw.action.pull);
  }, 1000*60*60);
});
schedule.scheduleJob(timeFinish, function(){
  if(executeJobTime)
    clearTimeout(executeJobTime);
});

app.set('port', (process.env.PORT || 3001));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/form', (req, res) => {
    petition_handler.add_petition((req.body));
    console.log("generando peticion...");
    //ftpw.exec(ftpw.action.push);
    return true;
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

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console



});



