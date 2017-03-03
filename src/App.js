import React, { Component } from 'react';
import Peticiones from './Peticiones';
import Resultdatos from './Result';
//import './App.css';
import '../node_modules/foundation-sites/dist/css/foundation.min.css'
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css'

require('react-foundation');
var $ = require('jquery');

class App extends Component {
  construct(props){
    this.name = props.name;
    this.datos = undefined;
  }

  solicitaDatos(data, resource, path, myThis){
      var urlpath = path;
     $.ajax({
        url: urlpath,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
          console.log(response);
          /*myThis.datos = response;
          myThis.render();
          //return response;
          myThis.forceUpdate();*/
        },
        error: function(response) {
          console.log("error");
        }
    });
  }
  render() {
    console.log(this);
    var show;
    if(this.datos)
      show = <Resultdatos datos={this.datos}/>;
    else
      show = <Peticiones name={this.props.name} solicitaDatos={this.solicitaDatos} AppThat={this} />;
    return (
      <div className="App">
        {show}
      </div>
    );
  }
}

export default App;
