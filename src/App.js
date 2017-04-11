import React, { Component } from 'react';
import Peticiones from './components/Peticiones';
import Result from './components/Result';
//import './App.css';
import '../node_modules/foundation-sites/dist/css/foundation.min.css'
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css'

require('react-foundation');
var $ = require('jquery');
//var Correo = require('./Correo');

var  exampleEmails = [
  
      {
        id: 1,
        from: "albamontero@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "Primer email Mutokamwoyo",
        body: "Este el el primer email de la aplicacion"
      },

      {
        id: 2,
        from: "albamontero@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "Segundo mail",
        body: "Este es el segundo"
      },

      {
        id: 3,
        from: "sergiosemedi@ucm.es",
        to: "juanmontiel@ucm.es",
        subject: "reunion TFG",
        body: "Oye que el jueves hay reuinon"
      }
];

class App extends Component {
  construct(props){
    this.name = props.name;
    this.datos = undefined;
    this.mails = undefined;
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
    if(this.name == "" ){
      show = <Correo emails={exampleEmails} />;
    }else {
    
    if(this.datos)
      show = <Resultdatos datos={this.datos}/>;
    else
      show = <Peticiones name={this.props.name} solicitaDatos={this.solicitaDatos} AppThat={this} />;
  }
    return (
      <div className="App">
        {show}
      </div>
    );
}
}

export default App;
