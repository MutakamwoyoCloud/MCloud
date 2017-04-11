var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var _sys = require('./utils').module;

var url = 'mongodb://localhost:27017/mcloud';
var u = 'mongodb://localhost:5223/mcloud';


/*
*
* Constructor of data model
* server parameter reference the url of our mongodb server
* * */
var _Data = function(server){

    if (server)
        url = server;

}

/*
 * Namespace operation:
 *
 * in this namepasce we create all functions
 * related to make changes in the current model.
 *
 *
 */

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


/*
 * in this namespace we create all functions
 * related to READ the model database
*/
var content = {

    getAll : function(db, query, data, type, emitter){
        db.collection(type).find().forEach(function(item, err) {
                    emitter.emit('pull', item);
                });
    },
    getSome : function(db, query, data, type, emitter){
        var dataList = [];
        var data_reg = new RegExp(".*"+data+".*");
        console.log(data_reg);
        db.collection(type).find({ name : /.*ingles.*/}).forEach(function(item, err) {
            console.log(item);
            dataList.push(item);
        });
        //ES ASINCRONO
        emitter.emit('findSomeone', dataList);
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
 
/*
 * MODEL's MAIN FUNCTION
 *
 * we use this function outside to call 4 EVERY operation
 * that this class should do:
 * 	insert values
 * 	get values
 * 	update...
 *
 *$params:
 *
 * 	callback: related to previous namespaces (content, operation...). Callback expect to receive one of these function to execute it
 * 	query: The object with the query, if we are doing a operation that does not need this kind of parameter we just simply leave it empty: {}
 * 	data: The object with the data, it can be used to create new data or update
 * 	emitter: the function expects a object emitter to end the async call
 * 	type: see MCloud/src/core/utils.js 
 *
 * */
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

