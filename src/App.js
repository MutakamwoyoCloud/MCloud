import React, { Component } from 'react';
import Peticiones from './Peticiones';
//import './App.css';
import '../node_modules/react-foundation/node_modules/foundation-sites/dist/foundation.min.css'
import '../node_modules/fixed-data-table/dist/fixed-data-table.min.css'

require('react-foundation');

class App extends Component {
  construct(props){
    this.name = props.name;
  }
  render() {
    console.log(this);
    return (
      <div className="App">
        <Peticiones name={this.props.name}/>
      </div>
    );
  }
}

export default App;
