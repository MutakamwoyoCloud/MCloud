var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/mcloud';
var u = 'mongodb://localhost:5223/mcloud';



var Data = module.exports = function(server){


    var final_direction = u;

    if (server)
        final_direction = server;

    // url example: 'mongodb://localhost:27017/mcloud'
    MongoClient.connect(final_direction, function(err, db) {
        assert.equal(null, err);
        console.log("Connecting to data model...");

        //db.createCollection('test', function(err, collection) {});

        db.close();
    });
};

var operation = module.exports = {
    insert: function(){
        var collection = db.collection('main');

    }
}


Data.prototype.insert= function(toInstert){

        MongoClient.connect(final_direction, function(err, db) {
        assert.equal(null, err);

             db.collection('main').insertOne( toInsert
                ,
                function(err, result) {
                    assert.equal(err, null);
                });


        db.close();
    });


};


var data = new Data();

