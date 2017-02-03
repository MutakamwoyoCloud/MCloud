var Client = require('ftp');
var c = new Client();


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
                console.log("entrooo");
                c.put('src/core/petition_example1.tar.gz', 'petition_example.tar.gz', function(err) {
                  if (err)
                    throw err;
                  console.log("terminoo");
                  c.end();
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
