var Client = require('ftp');
var c = new Client();


/*
* This function is related to code execution
* once we already stablished the connection
*/
function make_operations(list){
  console.log("estoy dentro del directorio");
  console.dir(list);
}

/*
* We attach an event handler function for the event 'ready'
* this event will be triggered when we are connected to
* ftp.
*/
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    make_operations(list);
    c.end();
  });
});
// connect to localhost:21 as anonymous



function send_info(){
  var options = {
    user:"semedi",
    password:"qazwsx123321"
  };
  c.connect(options);
}

send_info();
