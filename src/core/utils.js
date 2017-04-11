//Utils.js
//===========
var uuid = require('node-uuid');

// enum used 4 module names


module.exports={
    generateTimeId : function (){
        return uuid.v1();
    },

    module: {
        type : {
            vademecum : 0,
            wikipedia : 1,
            youtube : 2
        },

        get: function(type){
            var df = "NaN";

            if (type == 0)
                df="vademecum";
            else if (type == 1)
                df="wiki";
            else if (type == 2)
                df="youtube";
            
            console.log("type: "+type);



            return df;
        }

    }



};
