import React, {Component} from 'react'
import Peticiones from './Peticiones'

export default class Vademecum extends Component {
  constructor(props){
    super(props);
    this.name = "Vademecum";
  }
  render() {
    return (
      <div>
        <Peticiones name= {this.name}></Peticiones>    
      </div>
    )
  }
}