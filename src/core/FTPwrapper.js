var Client = require('ftp');
var c = new Client();
const fs = require('fs');


const pushFolder = './src/core/push/';
const pullFolder = './src/core/pull/'

var action = {
    idle : 0,
    push : 1,
    pull : 2,
    fetch : 3
};

var status = action.idle;

function init() {
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
                  c.list(function(err, list) {
                    if (err) throw err;
                    console.dir(list);
                    c.end();
                  });
                  break;

          }
});


c.on('error', function() {

  comsole.log("ha habido un error");
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
