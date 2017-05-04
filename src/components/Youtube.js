import React, {Component} from 'react'
import Peticiones from './Peticiones'

export default class Youtube extends Component {
  constructor(props){
    super(props);
    this.name = "Youtube";
  }
  render() {
    return (
      <div>
        <Peticiones name= {this.name}></Peticiones>    
      </div>
    )
  }
}

