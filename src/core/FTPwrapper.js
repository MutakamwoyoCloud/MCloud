var Client = require('ftp');
var c = new Client();


/*
* This function is related to code execution
* once we already stablished the connection
*/
function make_operations(list){
  console.log("estoy dentro del directorio")
  console.dir(list);
}


c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    make_operations(list);
    c.end();
  });
});
// connect to localhost:21 as anonymous



function create_petition(){
  var options = new Object();
  options.user="semedi";
  options.password="qazwsx123321"
  c.connect(options);
}

create_petition();
