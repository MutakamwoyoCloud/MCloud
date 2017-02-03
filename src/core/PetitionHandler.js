// require modules
var fs = require('fs');
var archiver = require('archiver');
var tools = require('./utils');

function create_package(petitions, id){

  // create a file to stream archive data to.
  var output = fs.createWriteStream(__dirname + '/'+id+'.tar.gz');
  var archive = archiver('tar', {
      gzip: true,
      store: true // Sets the compression method to STORE.
  });

  // listen for all archive data to be written
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  for (var i = 0, len = petitions.length; i < len; i++){
    archive.append(petitions[i], {name: i+'.json'});
  }


  // finalize the archive (ie we are done appending files but streams have to finish yet)
  archive.finalize();

}



var PH = module.exports = function(package_size){
  this._qoldidx =1;
  this._qnewidx =1;
  this._qstorage={};

  this._i=0;
  this._package_size = package_size;
  this._petitions = [];
};

PH.prototype.size = function(){
  return this._qnewidx - this._qoldidx;
};

PH.prototype.enqueue = function(data) {
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


PH.prototype.add_petition= function(data){


  this._petitions[this._i] = data;
  this._i++;

  if (this._i == this._package_size){
    //var id = tools.generateTimeId();
    var id = "petition_example"+this._i;
    var petitions = this._petitions;
    create_package(petitions, id);
    this.enqueue(id);
    this._i = 0;
  }





};

/*
var petition_hander = new PH(10);

for (var i = 0, len = 10; i < len; i++){
  var prueba = "polla";
  petition_hander.add_petition(prueba);

}
*/
