// require modules
var fs = require('fs');
var archiver = require('archiver');
var tools = require('./utils');
var events = require('events');
var _model = require('./Data');
const decompress = require('decompress');

var _sys = tools.module;


var schedule = require('node-schedule');
var time = {};
time.hour = 22;
time.minute = 0;
schedule.scheduleJob(time, function(){
  console.log("son las "+ time.hour+":"+time.minute);
});

/* Constructor
* Create a new handler object
* package_size references to the size 4 every packet
*
* example: 
* 	we set packake_size to 6
* 	we add 13 petitions
* 	13 % 6 = 1 Petition left, <======================================= we need to check
* 	13 / 6 = 2 packages are being created and ready to upload 
*/

var PH = module.exports = function(package_size){

  this.data = new _model.Data();
  this.emitter = new events.EventEmitter();

  //console.log(_model);
  this._qoldidx =1;
  this._qnewidx =1;
  this._qstorage={};

  this._i=0;
  this._package_size = package_size;
  this._petitions = [];

  this.options = {
    gzip: true,
    store: true // Sets the compression method to STORE.
  };


};

//return the size of the queue
PH.prototype.size = function(){
  return this._qnewidx - this._qoldidx;
};


PH.prototype.enqueue = function(data) {
  console.log(data+" added to the queue!");
  this._qstorage[this._qnewidx] = data;
  this._qnewidx++;
};

PH.prototype.dequeue = function(){
  var oldIdx = this._qoldidx,
      newIdx = this._qnewidx,
      toDelete;

  if (oldIdx !== newIdx){
    toDelete = this._qstorage[oldIdx];
    delete this._qstorage[oldIdx];
    this._qoldidx++;

    return toDelete;
  }
};

PH.prototype.reset = function(){
 
  this._i = 0;
};


    //tools.generateTimeId();
    //var id = "petition_example"+this._i;
PH.prototype.add_petition= function(data){


  this._petitions[this._i] = data;
  this._i++;

  if (this._i == this._package_size){
    create_package(this);
  }
  

};


// private functions
/**************************************************************************/
//this function create a package and enqueue
function create_package(self){


  
  self.emitter.on('newPackage', function(id){

    var archive = archiver('tar', {
      gzip: true,
      store: true // Sets the compression method to STORE.
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    var output = fs.createWriteStream(__dirname + '/push/'+id+'_wiki.tar.gz');

    // listen for all archive data to be written
    output.on('close', function() {

      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

      // pipe archive data to the file
    archive.pipe(output);

    self.enqueue(id);
    // create a file to stream archive data to.

      
      
      

    //we create the first data entry
    //archive.append(JSON.stringify(self._petitions[0]), {name: i+'.json'});

    //self.data.do(_model.content.get, {ready: false}, self.emitter);

    for (var i = 0, len = self._petitions.length; i < len; i++){
      archive.append(JSON.stringify(self._petitions[i]), {name: i+'.json'});
    }
    
    
    archive.finalize();
    self.reset();
  });

self.data.do(_model.op.insert,{}, {ready: false}, self.emitter);

}

//receive and decompress a package 
function receive_package(self){
  console.log("ncnsldibclisad");
  var pull_folder = './pull/';
  fs.readdir(pull_folder, (err, files) => {
    files.forEach(file => {
      decompress(pull_folder+file, pull_folder+'dist_'+file.split("_")[0]).then(files_decompress => {
        files_decompress.forEach(file_decompress => {
          console.log(file_decompress.path);
          var type = file_decompress.path.split("_")[0];
          console.log(type);
          var name_search = file_decompress.path.split("_")[1].split(".")[0];
          var json = require(pull_folder+'dist_'+file.split("_")[0]+"/"+file_decompress.path);
          var json_insert = {};
          json_insert["name"] = name_search;
          json_insert["data"] = json;
          self.data.do(_model.op.insert,{}, json_insert, self.emitter, 1);
        });
      });
      //console.log(file);
    });
  });
  
}



/* Usage example: */

//var ph = new PH(8);

/*
var sleep = require('sleep');
for (var i = 0, len = 24; i < len; i++){
    
    var object = {
      "nombre": "hijouta"+i       
    };
    console.log("procesando peticion \n");
    ph.add_petition(object);

  }
  */

