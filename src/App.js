import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GererCompte from './Components/GererCompte';
import Banniere from './Components/Banniere';
import Menu from './Components/Menu';
import Contacter from './Components/Contacter';
import Souscrire from './Components/Souscrire';
import ConsulterCompte from  './Components/ConsulterCompte';
import SeConnecter from  './Components/SeConnecter';
import LogoutDialog from './Components/LogoutDialog';
import RecupMdp from './Components/RecupMdp';
import { connect } from 'react-redux';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {  
      isLogout : false   
    } 
  }

  deconnecter = ()=> {    
    this.setState({
      isLogout : true
    });
    
  }
    
  render() {  
    const lastConnection = this.props.user !== null ? (this.props.user.lastConnection) : (null);
    return (
            
       <Router>
          <Banniere />          
            {
              this.props.isAuth === false &&              
              <Route exact path="/signup" component={SeConnecter}  />
            }
            {
              this.props.isAuth === true && 
              <Route path="/logout" render={(props) => {
                return <LogoutDialog {...props} deconnecter={this.deconnecter} />
                }
              } />
            }            
            {   
              this.props.isAuth === true &&                          
               <Fragment>
                 <label className="container ml-auto"> Votre dernière connexion : {lastConnection}   </label>                                               
                  <Menu />                                                   
                  <Switch>                 
                      <Route exact path="/" component={ConsulterCompte}/> 
                      <Route  path="/consulter" component={ConsulterCompte}/> 
                      <Route  path="/gerer" component={GererCompte}/>                                               
                      <Route  path="/contacter" component={Contacter}/>
                      <Route  path="/souscrire" component={Souscrire}/>                                     
                  </Switch>                     
                </Fragment>                  
             }
             {   
              this.props.isAuth === false && 
                <Route path="/recupmdp" render={(props) => {
                  return <RecupMdp {...props} displayMdp={this.displayMdp}/>
                  }
                }              
              />              
             }                              
        </Router>       
   )
 } 
}

const mapStateToProps = (state) => {  
  return {
    user : state.user,
    isAuth : state.isAuth,
    comptesByUser : state.comptesByUser   
  }
};

export default connect(mapStateToProps, null)(App);


