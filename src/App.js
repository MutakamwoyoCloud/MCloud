import React, { Component } from 'react';
import NameForm from './NameForm';
import Table from './Table';
//import './App.css';
import '../node_modules/foundation-sites/dist/css/foundation.min.css'
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css'

require('react-foundation');
const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="search">
          <fieldset>
            <legend>Nueva Peticion</legend>
            <NameForm/>
          </fieldset>
        </div>
        <div className="search">
          <fieldset>
            <legend>Resultados</legend>
            <Table rows={rows}/>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default App;
