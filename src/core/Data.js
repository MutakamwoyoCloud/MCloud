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
    insert: function(db, toInsert, type, emitter){

        db.collection(type).insert(toInsert, function(err, res){
            console.log("se ha insertado correctamente "+res.ops[0]._id);
            emitter.emit('newPackage', res.ops[0]._id);
            
        });
    }
}

var content = {

    getAll : function(db, query, type, emitter){
            return db.collection(type).find();
    },
    get : function(db, query, type, emitter){
        db.collection(type).findOne(query, function(err, doc){
            console.log(doc);
            emitter.emit('newPackage', doc._id);
        });        
    }


}




 

_Data.prototype.do = function(callback, data, emitter, type){

    var col = 'main';
    
    if (type)
        col =_sys.get(type);

    MongoClient.connect(url, function(err,db){
        assert.equal(null, err);

        var cursor = callback(db, data, col, emitter);
        
        if (cursor){
            if (cursor.constructor.name == "Cursor"){
                cursor.forEach(function(item, err) {
                    console.log(item);
                });
            }
 
        }


        db.close();
    } );
}

module.exports = {
    Data : _Data,
    op : operation,
    content: content
};
