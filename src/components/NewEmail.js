import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import { Button } from 'react-bootstrap';



export default class NewEmail extends Component {
  constructor(props){
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {to: '', subject:'', content:' '};
  }
  handleChange(event){
    if(event.target.type == "email"){
    this.setState({to:event.target.value});
    }
    else if(event.target.type == "text"){
        this.setState({subject:event.target.value});
    }
    else  this.setState({content:event.target.value});
  }
  handleSubmit(){
    alert("los datos son " + this.state.to + " " + this.state.subject + " " + this.state.content)
  }
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Para
          </Col>
          <Col sm={10}>
            <FormControl type="email" value= {this.state.to} onChange={this.handleChange} placeholder="Introduce el email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalText">
          <Col componentClass={ControlLabel} sm={2}>
            Asunto
          </Col>
          <Col sm={10}>
            <FormControl type="text" value= {this.state.subject} onChange={this.handleChange} placeholder="Asunto" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea" type="textarea" value={this.state.content} onChange={this.handleChange} placeholder="Escribe aquí el correo" />
        </FormGroup>
        <Button type="submit" onClick={this.handleSubmit}> Enviar </Button>

      </Form>
    );
  }
}