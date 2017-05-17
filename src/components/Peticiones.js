import React, { Component } from 'react';
import NameForm from './NameForm';
import Table from './Table';
import { Row, Col } from 'react-bootstrap';

//var Row = require('react-foundation').Row;
var Column = require('react-foundation').Column;
var Button = require('react-foundation').Button;
var CommonActions = require('./utils/CommonActions');
var tr = require('../../translate.js');

var $ = require('jquery');

require('react-foundation');

export default class Peticiones extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.name = props.route.name;
    this.handleChange = this.handleChange.bind(this);
    this.table = undefined;
    this.thisPrincipal = props.AppThat;
    this.handleSubmit = this.handleSubmit.bind(this);
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
    params.data = event.target.value;
    params.type = "wiki";
    if(params.data != "")
      CommonActions.list(params, "search");
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Col sm={10} large={8}>
            <h1 className="texto_principal_peticiones App-header">{this.name}</h1>
          </Col>
        </Row>
        </form>
        <Row>
          <div className="search">
            <fieldset>
              <legend><h3>{"Nueva Peticion"}</h3></legend>
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
