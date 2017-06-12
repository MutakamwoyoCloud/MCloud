import React, { Component } from 'react';
var Row = require('react-foundation').Row;

require('react-foundation');

export default class ResultYoutube extends Component {
  constructor(props){
    super(props);
    if (Array.isArray(props.location.state.data))
      this.datos = props.location.state.data[0].data;
    else
      this.datos = props.location.state.data.data;
    //this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <Row isColumn>
          <h1 className="texto_principal_peticiones App-header">{this.datos.name}</h1>
        </Row>
        <Row isColumn>
          <div className="search" style={{display: 'flex', justifyContent: 'center'}}>
              <video src={this.datos.url} width="800" controls type="video/3gp"/>
          </div>
        </Row>
      </div>
    );
  }
}

