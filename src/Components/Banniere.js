import React from 'react';
import iconeProfile from '../images/user.png';
import iconeLogout from '../images/logout.png';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

const Banniere = (props) => {  
    
  const userName = props.user !== null ? (props.user.nom) : (null);
  const userLastName = props.user !== null ? (props.user.prenom) : (null);
  const userCivilite = props.user !== null ? (props.user.civilite) : (null);
  
  
  return (
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h3>Espace Client la Banque Postale</h3> 
               
        <div className="collapse navbar-collapse" id="navbarNav">           
            <ul className="navbar-nav ml-auto">  
            {                
               props.isAuth === false && 
                <li className="nav-item"  data-toggle="tooltip" data-placement="left" title="Se connecter">                    
                  <Link className="nav-link mr-3" to="/signup">                      
                    <img src={iconeProfile}  
                    width="35" height="35"  alt="pro" /> Me connecter 
                  </Link>
                </li>
            }               
            {
               props.isAuth === true &&
                <div className="container">                  
                  <label className="mr-5">{userCivilite} {userLastName} {userName} </label>  
                  <li className="nav-item">                    
                    <Link className="nav-link mr-3" to="/logout">                      
                      <img src={iconeLogout}  
                      width="35" height="35"  alt="log" />Me déconnecter                       
                    </Link>
                  </li> 
                </div>  
            }                           
            </ul>
          </div>
        </nav>          
  );  
}

const mapStateToProps = (state) => {  
  return {
    user : state.user,
    isAuth : state.isAuth
  }
};

export default connect(mapStateToProps, null)(Banniere);

