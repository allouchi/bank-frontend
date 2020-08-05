import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 



class Menu extends Component {
  
  constructor(props) {
    super(props)  
    this.state = {      
    }
  }  
  render() {
    return (
        <nav className="navbar navbar-dark bg-primary container mt-4">          
            <Link className="navbar-brand" to="/consulter">Consulter</Link>
            <Link className="navbar-brand" to="/gerer">Gérer</Link>
            <Link className="navbar-brand" to="/contacter">Contacter</Link>
            <Link className="navbar-brand" to="/souscrire">Souscrire</Link>          
       </nav>
    );
  }
}

export default Menu;
