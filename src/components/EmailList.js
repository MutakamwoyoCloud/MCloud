import React, { Component } from 'react';
require('react-foundation');

import EmailListItem from './EmailListItem';

export default class EmailList extends Component{
  construct(props){
    this.emails = props.emails;
  }

  render() {

    console.log(this.props.emails);
    var email_list = this.props.emails.map(function(mail) {
      return (
        <EmailListItem key={mail.id}
                       from={mail.from}
                       to={mail.to}
                       subject={mail.subject}
                       on_click={this.props.onSelectEmail.bind(null, mail.id)} />
                       
      );
    }.bind(this));

    return (
      <table className="email-list table table-striped table-condensed">
        <thead>
          <tr>
            <th>Subject</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
        {email_list}
        </tbody>
      </table>
    );
  }
}