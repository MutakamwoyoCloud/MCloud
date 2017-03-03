var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/mcloud';
var u = 'mongodb://localhost:5223/mcloud';



var _Data = function(server){

    if (server)
        url = server;

}

var operation = {
    insert: function(db, toInsert){
        db.collection('main').insert(toInsert, function(err, res){
            console.log("se ha insertado correctamente");
        });
    }
}

_Data.prototype.do = function(callback, data){
    MongoClient.connect(url, function(err,db){
        assert.equal(null, err);
        callback(db, data);
        db.close();
    } );
}

module.exports = {
    Data : _Data,
    op : operation 
};
/*
var data = new Data();
var example = 
            {
                var:1
            };
data.do(operation.insert, example);
*/
