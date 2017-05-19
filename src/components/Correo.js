import React, { Component } from 'react';
require('react-foundation');
import Email from './Email';
import EmailList from './EmailList';
import NewEmail from './NewEmail';
import '../App.css';

var Button = require('react-foundation').Button;

var exampleEmails = [
  
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




export default class Correo extends Component{
  constructor(props){
    super(props);
    this.emails = exampleEmails;
    //this.email_id = null;
    this.handleSelectEmail = this.handleSelectEmail.bind(this);
    this.handleNewMail = this.handleNewMail.bind(this);
    this.state = {email_id: 0, new_email: false};
  }
  
  handleSelectEmail(event) {
    var id= event;
    alert("He seleccionado un correo con id = " + id);
    //this.email_id = id; 
    this.setState({email_id: id});
  }

  handleNewMail(){
    alert("me han pulsado!");
    this.setState({new_email: true});
  }

  render() {
    //var email_id = this.state;
    var email_id = this.state.email_id;
    var new_email = this.state.new_email;
    var selected_email;
    if(new_email){
      selected_email = <NewEmail/>
    }
    else{
      if (email_id) {
        var mail = this.emails.filter(function(mail) {
          return mail.id === email_id;
        })[0];
        selected_email = <Email id={mail.id}
                                from={mail.from}
                                to={mail.to}
                                subject={mail.subject}
                                emailContent={mail.body} />;
      } else {
        selected_email = <div className="none-selected alert alert-warning" role="alert">
                            <span>No {this.props.text} selected.</span>
                         </div>
        }
    }

    return (
      <div className="inbox">
      <div className="row">
        <div className="col-md-4">
          <Button type="submit" onClick={this.handleNewMail}>Nuevo correo</Button>
        </div>
        <div>
        <EmailList emails={this.emails}
                     onSelectEmail={this.handleSelectEmail} />
        </div>
        </div>
        <div className="email-viewer">
          {selected_email}
        </div>
      </div>
    );
  }
}



