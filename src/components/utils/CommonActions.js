  module.exports = {
   list,
   newPetition
  }
  var $ = require('jquery');
  function list(params, resource, path) {
    var callback = params.success;
    var callbackError = params.error;
    //var id = params.data.id;
    var request;
    var reqPath = path ? path : resource.toLowerCase();
    reqPath += "?data="+params.data+"&type="+params.type;

    $.ajax({
        url: "/api/"+reqPath,
        type: "GET",
        datatype: "json",
        success: function(response) {
          return callback ? callback(request, response) : null;
        },
        error: function(response) {
          return callbackError ? callbackError(response) : null;
        }
    });
  }
  
  function newPetition(params, resource, path) {
      var callback = params.success;
      var callbackError = params.error;
      var data = params.data;
      var request;
      var reqPath = path ? path : resource.toLowerCase();

      $.ajax({
        url: "/api/"+reqPath,
        type: "POST",
        data: data,
        contentype: "application/json",
        success: function(response) {
          return callback ? callback(request, response) : null;
        },
        error: function(response) {
          return callbackError ? callbackError(response) : null;
        }
    });
  }
