define(function(require) {


  CommonActions.prototype.list = _list;
  CommonActions.prototype.newPetition = _newPetition;

  return CommonActions;
  function _list(params, resource, path) {
    var callback = params.success;
    var callbackError = params.error;
    //var id = params.data.id;
    var action, request;
    var reqPath = path ? path : resource.toLowerCase();
    var list = "";
    if(Array.isArray(params.listParam)){
      for(l in params.listParam){
        list += params.listParam[l] +"+";
      }
      list.slice(0,-1);
      reqPath += "?data="+list;
    }
    else
      reqPath += "?data="+params.listParam;

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
  
  function _newPetition(params, resource, path) {
      var callback = params.success;
      var callbackError = params.error;
      var data = params.data;
      var reqPath = path ? path : resource.toLowerCase();

      $.ajax({
        url: urlpath,
        type: "POST",
        data: data,
        datatype: "application/json",
        success: function(response) {
          return callback ? callback(request, response) : null;
        },
        error: function(response) {
          return callbackError ? callbackError(response) : null;
        }
    });
    },
});
