import React, { Component } from 'react';
import NameForm from './NameForm';
import Table from './Table';
var Row = require('react-foundation').Row;

require('react-foundation');

class Peticiones extends Component {
  constructor(props){
    super(props);
    this.name = props.name;
  }
  render() {
    return (
      <div>
        <Row isColumn>
         <label className="texto_principal_peticiones">{this.name}</label>
        </Row>
        <Row isColumn>
          <div className="search">
            <fieldset>
              <legend>Nueva Peticion</legend>
              <NameForm/>
            </fieldset>
          </div>
          <div className="search">
            <fieldset>
              <legend>Resultados</legend>
              <Table/>
            </fieldset>
          </div>
        </Row>
      </div>
    );
  }
}

export default Peticiones;
