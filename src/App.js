import React, { Component } from 'react';
import NameForm from './NameForm';
//import './App.css';
import '../node_modules/react-foundation/node_modules/foundation-sites/dist/foundation.min.css'
require('react-foundation');

class App extends Component {
  render() {
    return (
      <div className="App">
        <fieldset>
          <legend>Nueva Peticion</legend>
          <NameForm/>
        </fieldset>
        <fieldset>
          <legend>Resultados</legend>
          <span id="show_result"></span>
        </fieldset>
      </div>
    );
  }
}

export default App;
