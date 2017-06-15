var Client = require('ftp');
var c = new Client();
const fs = require('fs');
var Id = require("mongodb").ObjectID;

var _p = require('./PetitionHandler');

var _model = require('./Data');
var ops = _model.op;
var content = _model.content;


const pushFolder = './src/core/push/';
const flushFolder = './src/core/flush/';
const pullFolder = './src/core/pull/'
const fetchFolder = 'MCloud/inet_side/out/'

var options = {}

/*
* Action describe us the all ftp states
*
* idle: do nothing
* push: upload packages to the main server (located in Madrid)
* pull: download processed packages
* fetch: Check if the packages are ready
*
* */
var action = {
    idle : 0,
    push : 1,
    pull : 2,
    fetch : 3,
    flush : 4
};

//we need a reference 4 the handler of the core (petition_handler)
var handler = undefined;

//initial status
var status = action.idle;

/*
 * we need to call this function before we start to use ftpWrapper
 * sets the current handler
* */
function init(handler_ref, opts) {
  handler = handler_ref;
  var status = action.idle;

  options = opts;
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
*
* It will perform any of the actions defined earlier ( idle, push, fetch, pull )
*/
c.on('ready', function() {

  switch (Number(status)) {

              case action.idle:
                  break;

              case action.push:
                fs.readdir(pushFolder, (err, files) => {
                  if (err)
                    console.log("provider not reached\n");
                  files.forEach((file) => {
                    c.put(pushFolder+file, "MCloud/inet_side/received/"+file, function(err) {
                      if (err) //throwable -> throw err
                        throw err;
                      fs.unlinkSync(pushFolder+file);
                      c.end();
                    });
                  });//foreach
                });

              break;

              case action.flush:
                fs.readdir(flushFolder, (err, files) => {
                  files.forEach((file) => {
                    c.put(flushFolder+file, "MCloud/inet_side/received/"+file, function(err) {
                      if (err) //throwable -> throw err
                        throw err;
                      fs.unlinkSync(flushFolder+file);
                      c.end();
                    });
                  });//foreach
                });

              break;

              case  action.pull:
                  if (handler){
                      handler.emitter.on('pull', function(item){
                        if (item.ready){
                          var name = item._id+"_"+item.typePetition+"_out.tar.gz";
                          c.get(fetchFolder+name , function(err, stream) {
                            if (err) throw err;
                            console.log(name);
                            stream.once('close', function() { c.end(); });
                            stream.pipe(fs.createWriteStream(pullFolder+name));
                            handler.pull();
                          });
                        }
                      });
                      handler.data.do(content.getAll, {}, {}, handler.emitter);

                    }
                  break;

              case action.fetch:
                  c.list(fetchFolder, function(err, list) {
                    if (err) throw err;
                      list.forEach(function(elem){
                        if (handler && elem.name.split("_")[0] !== "medicamentos") {
                          handler.data.do(ops.update, {_id: Id(elem.name.split("_")[0])}, {ready:true}, handler.emitter);
                        }
                        else if(handler && elem.name.split("_")[0] === "medicamentos") {
                          handler.data.do(ops.insert,{}, {_id: elem.name.split("_")[0], ready: true, typePetition: "vademecum"}, handler.emitter);
                        }
                      });
                    c.end();
                  });
                  break;

          }
});


c.on('error', function() {
  console.log("ha habido un error");
});



/*
*
* ftp main functions
*
* execs an action passed by parameter
*/ 
function exec(action){

  status = action;
  c.connect(options); //

}



module.exports = {
  exec,
  action,
  init
};

