import React, { Component } from 'react';
require('react-foundation');

export default class EmailListItem extends Component{
 
  render() {
    return (
      <tr onClick={this.props.on_click.bind(null)}>
        <td>{this.props.subject}</td>
        <td>{this.props.from}</td>
        <td>{this.props.to}</td>
      </tr>
    );
  }
}
