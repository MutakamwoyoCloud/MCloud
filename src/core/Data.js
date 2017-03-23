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
    insert: function(db,query, toInsert, type, emitter){

        db.collection(type).insert(toInsert, function(err, res){
            console.log("se ha insertado correctamente "+res.ops[0]._id);
            emitter.emit('newPackage', res.ops[0]._id);
            
        });
    },

    update: function(db, query, toModify, type, emmiter){
        db.collection(type).findAndModify(
            query, // query
            [['_id','asc']],  // sort order
            {$set: toModify}, // replacement, replaces only the field "hi"
            {}, // options
            function(err, object) {

                if (err){
                    console.warn(err.message);  // returns error if no matching object found
                }else{
                    console.dir(object);
                }
        });
    }
}

var content = {

    getAll : function(db, query, data, type, emitter){
            return db.collection(type).find();
    },
    get : function(db, query, data, type, emitter){
        db.collection(type).findOne(query, function(err, doc){
            console.log(doc);
            emitter.emit('newPackage', doc._id);
        });        
    }


}


/* accesing Cursor ObjectI
   Not mandatory!

        if (cursor){
            if (cursor.constructor.name == "Cursor"){
                cursor.forEach(function(item, err) {
                    console.log(item);
                });
            }
        }  we iterate over the cursos printing all documents
*/
 

_Data.prototype.do = function(callback, query, data, emitter, type){

    var default_col = 'fetch';
    
    if (type)
        default_col =_sys.get(type);

    MongoClient.connect(url, function(err,db){
        assert.equal(null, err);

        // see cursor example above 
        var cursor = callback(db, query, data, default_col, emitter);

        db.close();
    } );
}

module.exports = {
    Data : _Data,
    op : operation,
    content: content
};

