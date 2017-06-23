import React, { Component } from 'react';
require('react-foundation');


export default class Email extends Component {

  render() {
    return (
      <div className="email">
        <dl className="meta dl-horizontal">

          <dt>From</dt>
          <dd>{this.props.from}</dd>

          <dt>To</dt>
          <dd>{this.props.to}</dd>

          <dt>Subject</dt>
          <dd>{this.props.subject}</dd>

        </dl>

        <div className="emailBody">
        	{this.props.emailContent}
        </div>
      </div>
    );
  }
}