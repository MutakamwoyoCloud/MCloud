var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var _sys = require('./utils').module;

var url = 'mongodb://localhost:27017/mcloud';
var u = 'mongodb://localhost:5223/mcloud';



var _Data = function(server){

    if (server)
        url = server;

}

var operation = {
    insert: function(db, toInsert, type){

        db.collection(type).insert(toInsert, function(err, res){
            console.log("se ha insertado correctamente");
        });
    }
}

var content = {

    get : function(db, query, type){

          db.collection(type).find.toArray(query, function(err, res){
            if (err)
                throw err;

            console.log(res);
          });

      }


}

_Data.prototype.do = function(callback, data, type){

    var col = 'main';
    if (type)
        col =_sys.get(type)

    MongoClient.connect(url, function(err,db){
        assert.equal(null, err);
        callback(db, data, col);
        db.close();
    } );
}

module.exports = {
    Data : _Data,
    op : operation,
    content: content
};
