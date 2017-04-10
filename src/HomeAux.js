import { Link } from 'react-router'
import React, {Component} from 'react'

class HomeAux extends Component {
  render() {
    return (
      <div>
        <h1></h1>
        <ul role="nav">
          <li><Link to="/Peticiones" activeStyle={{ color: 'red' }}>Peticiones</Link></li>
          <li><Link to="/About" activeStyle={{ color: 'red' }}>About</Link></li>

          <li><Link to="/correo" activeStyle={{ color: 'red' }}>Correo</Link></li>
        </ul>
      </div>
    )
  }
}
export default HomeAux;