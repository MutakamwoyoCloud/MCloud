// src/components/About/index.js
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';


export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('test', className)} {...props}>
        <h1>
            test
        </h1>
    <form action="http://localhost:3001/test?type='push'&name='hitler'&num=3">
      <input type="submit" value="push" />
    </form> 
    <form action="http://localhost:3001/api/fetch">
      <input type="submit" value="fetch" />
    </form> 
    <form action="http://localhost:3001/api/pull">
      <input type="submit" value="pull" />
    </form> 


      </div>
    );
  }
}
