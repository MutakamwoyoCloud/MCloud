import React, { Component } from 'react';
import NameForm from './NameForm';
import Table from './Table';
var Row = require('react-foundation').Row;
var $ = require('jquery');

require('react-foundation');

class Peticiones extends Component {
  constructor(props){
    super(props);
    this.name = props.name;
    this.handleChange = this.handleChange.bind(this);
    this.table;
  }
  handleChange(event){
    console.log("enviado");
    var that = this;
    $.getJSON({
        url: "/api/food?"+ "q=hash+browns",
        type: "GET",
        datatype: "json",
        success: function(response) {
          that.table = response;
          that.render();
          //return response;
          that.forceUpdate();
        },
        error: function(response) {
          //return null;
        }
    });
  }
  render() {
    console.log(this.table);
    return (
      <div>
        <Row isColumn>
         <label className="texto_principal_peticiones">{this.name}</label>
        </Row>
        <Row isColumn>
          <div className="search">
            <fieldset>
              <legend>Nueva Peticion</legend>
              <NameForm Change={this.handleChange}/>
            </fieldset>
          </div>
          <div className="search">
            <fieldset>
              <legend>Resultados</legend>
              <Table rows={this.table}/>
            </fieldset>
          </div>
        </Row>
      </div>
    );
  }
}

export default Peticiones;
