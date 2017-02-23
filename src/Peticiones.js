import React, { Component } from 'react';
import NameForm from './NameForm';
import Table from './Table';
var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Button = require('react-foundation').Button;
var CommonActions = require('./utils/CommonActions');

require('react-foundation');

class Peticiones extends Component {
  constructor(props){
    super(props);
    this.solicitaDatos = props.solicitaDatos;
    this.name = props.name;
    this.handleChange = this.handleChange.bind(this);
    this.table = undefined;
    this.thisPrincipal = props.AppThat;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Atras");
  }

  error(response){
    console.log(response);
  }

  success(response){
    this.table = response;
    this.render();
    this.forceUpdate();
  }
  handleChange(event){
    var that = this;
    var params = {};
    params.success = function(request,response){
      that.table = response;
      that.render();
      that.forceUpdate();
    }
    params.error = function(response){
      console.log(response);
    }
    params.listData=["hash","browns"];
    CommonActions.list(params, "food");
  }


  render() {
    console.log(this.table);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Column small={10} large={8}>
            <label className="texto_principal_peticiones">{this.name}</label>
          </Column>
          <Column small={2} large={4}>
            <Button type="submit">Atras</Button>
          </Column>
        </Row>
        </form>
        <Row isColumn>
          <div className="search">
            <fieldset>
              <legend>Nueva Peticion</legend>
              <NameForm Change={this.handleChange} solicitaDatos={this.solicitaDatos} that={this.thisPrincipal}/>
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
