import React, {Component} from 'react'
import Peticiones from './Peticiones'


export default class Wikipedia extends Component {
  constructor(props){
    super(props);
    this.name = "Wikipedia";
  }
  render() {
    return (
      <div>
        <Peticiones name= {this.name}></Peticiones>    
      </div>
    )
  }
}