// require modules
var fs = require('fs');
var archiver = require('archiver');
var tools = require('./utils');
var events = require('events');
var _model = require('./Data');
const decompress = require('decompress');

var schedule = require('node-schedule');
var _sys = tools.module;
var ftpw = require('./FTPwrapper');
var schedule = require('node-schedule');
var mongodb = require('mongodb');

const pullFolder = './src/core/pull/'

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

var PH = module.exports = function(package_size){

  this.data = new _model.Data();
  this.emitter = new events.EventEmitter();

  //console.log(_model);
  this._qoldidx =1;
  this._qnewidx =1;
  this._qstorage={};

  this._package_size = package_size;
  this._petitionsObj = {};
  this._petitionsNum = {};

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

PH.prototype.reset = function(type){
  this._petitionsNum[type] = 0; 
};


    //tools.generateTimeId();
    //var id = "petition_example"+this._i;
PH.prototype.add_petition= function(data){

  if (!this._petitionsObj[data.type]){
    this._petitionsObj[data.type] = [];
    this._petitionsNum[data.type] = 0;
  }

  this._petitionsObj[data.type][this._petitionsNum[data.type]] = data;
  this._petitionsNum[data.type]++;
  console.log(this._petitionsNum[data.type]);
  console.log(this._package_size);
  if (this._petitionsNum[data.type] == this._package_size){
    create_package(this, data.type);
  }
};

PH.prototype.search= function(callback, data, type){
  this.emitter.once('findSomeone', function(dataFind){
    if(dataFind)
      callback(dataFind);
    else
      callback({});
  });
  if(type == "wiki")
    this.data.do(_model.content.getSome,{}, data, this.emitter, 1);
  if(type == "youtube")
    this.data.do(_model.content.getSome,{}, data, this.emitter, 2);
};

PH.prototype.pull= function(callback){
  receive_package(this);
};

PH.prototype.fetch= function(){
  ftpw.exec(ftpw.action.fetch);
};

  

PH.prototype.searchOne= function(callback, data, type){
  this.emitter.once('findOne', function(dataFind){
    console.log(dataFind);
    if(dataFind)
      callback(dataFind);
    else
      callback({});
  });
  if(type == "wiki")
    this.data.do(_model.content.get,{}, data, this.emitter, 1);
};


// private
/**************************************************************************/

var time = {};


time.hour = 11;
time.minute = 57;

schedule.scheduleJob(time, function(){
  console.log("son las "+ time.hour+":"+time.minute);
  ftpw.exec(ftpw.action.push);
});

//this function create a package and enqueue
function create_package(self, type){

  self.emitter.on('newPackage', function(id){

    var archive = archiver('tar', {
      gzip: true,
      store: true // Sets the compression method to STORE.
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    var output = fs.createWriteStream(__dirname + '/push/'+id+'_'+type+'.tar.gz');

    // listen for all archive data to be written
    output.on('close', function() {

      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.pipe(output);

    self.enqueue(id)

    for (var i = 0, len = self._petitionsObj[type].length; i < len; i++){
      archive.append(JSON.stringify(self._petitionsObj[type][i]), {name: i+'.json'});
    }
    archive.finalize();
    self.reset(type);
  });

self.data.do(_model.op.insert,{}, {ready: false}, self.emitter);

}

//receive and decompress a package 
function receive_package(self){
  var pull_folder = pullFolder;
  fs.readdir(pull_folder, (err, files) => {
    files.forEach(file => {
      decompress(pull_folder+file, pull_folder+'dist_'+file.split("_")[0]).then(files_decompress => {
        files_decompress.forEach(file_decompress => {
          var type = file_decompress.path.split("_")[0];
          var name_search = file_decompress.path.split("_")[1].split(".")[0];
          var json = require(__dirname+'/pull/dist_'+file.split("_")[0]+"/"+file_decompress.path);
          var json_insert = {};
          json_insert["name"] = json["name"];
          json_insert["data"] = json;
          console.log("insertData");
          self.data.do(_model.op.insertData,{}, json_insert, self.emitter, 1);
        });
      });
      self.emitter.on("pulled", function(){
        console.log("PULLED");
        fs.appendFile(__dirname+'/flush/remove.txt', file+'\n', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        if( fs.existsSync(__dirname+'/pull/'+file) ) {
          deleteFolderRecursive(__dirname+'/pull/dist_'+file.split("_")[0]);
        }
        if( fs.existsSync(__dirname+'/pull/'+file) ) {
          self.data.do(_model.op.remove,file.split("_")[0], {}, null);
          fs.unlinkSync(__dirname+'/pull/'+file);
        }
      })
    });
  });
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}