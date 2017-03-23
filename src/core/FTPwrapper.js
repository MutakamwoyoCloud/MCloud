var Client = require('ftp');
var c = new Client();
const fs = require('fs');
var Id = require('mongodb').ObjectID;
var _model = require('./Data');

var ops = _model.op;


const pushFolder = './src/core/push/';
const pullFolder = './src/core/pull/'

const fetchFolder = 'MCloud/inet_side/out'

var action = {
    idle : 0,
    push : 1,
    pull : 2,
    fetch : 3
};

var model = undefined;
var status = action.idle;


function init(dataManager) {
  model = dataManager;
  var status = action.idle;
}

/*
* This function is related to code execution
* once we already stablished the connection
*/
function make_operations(list){


}

/*
* We attach an event handler function for the event 'ready'
* this event will be triggered when we are connected to
* ftp.
*/
c.on('ready', function() {

  switch (Number(status)) {

              case action.idle:
                  console.log("pana");
                  break;

              case action.push:
              
                fs.readdir(pushFolder, (err, files) => {
                  files.forEach(file => {
                    console.log(file);
                    c.put(pushFolder+file, "MCloud/inet_side/received/"+file, function(err) {
                      if (err) //throwable -> throw err
                        throw err;
                      
                      c.end();
                    });
                  });//foreach
                });

                break;

              case  action.pull:
                  console.log("pini");
                  break;

              case action.fetch:
                  c.list(fetchFolder, function(err, list) {
                    if (err) throw err;
                      list.forEach(function(elem){
                        if (model)
                          model.do(ops.update, {_id: Id(elem.name.split("_")[0])}, {ready:true}, model.emitter);
                      });
                    c.end();
                  });
                  break;

          }
});


c.on('error', function() {

  console.log("ha habido un error");
});



// exec
// connect to localhost:21 as mcloud
function exec(action){

  status = action;

  var options = {
    user:"mcloud",
    password:"mcloud"
  };

  c.connect(options); //

};

//module.exports = ftpw;

module.exports = {
  exec,
  action
};

init(new _model.Data());

exec(action.fetch);