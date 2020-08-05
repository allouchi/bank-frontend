import React, {Component, Fragment} from 'react';
import MessageNoCompte from './Messages/MsgNoCompte';
import { connect } from 'react-redux';

class ConsulterCompte extends Component {
  
  constructor(props) {
    super(props);
    this.state = {     
      typeCompte : "E",      
      errorServer : false,
      isCompteCC: false,
      isCompteEP : false,   
      numeroToEdit : 0,       
      compteToEdit : {
          id:0,
          typeCompte : 'E',
          numeroCompte : 0,
          nomCompte : '',
          solde : 0,
          dateCreation :  null
      },    
      compteModifie : {
        numeroCompte : 0,
        nomCompte : '',
        solde : 0,
        dateCreation :  null
      } 
    }    
  }

  convertDate = () =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) 
    {
        dd='0'+dd;
    }
    if(mm<10) 
    {
        mm='0'+mm;
    } 
     today = mm+'/'+dd+'/'+yyyy; 
     return  today;   
  }
  
  displayComptes = () =>{
    let comptes = this.props.comptesByUser;          
      if(comptes !== null && comptes.length > 0){        
        comptes.forEach( (element) => {
         
          if(element.typeCompte === 'E'){
            this.setState({
              isCompteEP : true
            });
          }else if(element.typeCompte === 'C'){
            this.setState({
              isCompteCC : true
            });
          }
        });
      }else{        
        this.setState({
          isCompteCC : false,
          isCompteEP : false
        });
      }      
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps.comptesByUser !== this.props.comptesByUser) 
    {     
      this.displayComptes();
    }
  }
  componentDidMount() {
    this.displayComptes();       
  }   
  
  renderCompte = (comptes, type)=> {
    
    return(
          comptes.map((compte, index) => {
            if(compte.typeCompte === type){              
              return (
                <tr key={index}>
                <td className="text-center"> {compte.numeroCompte}</td>                  
                <td className="text-center"> {compte.nomCompte}</td>              
                <td className="text-center"> {compte.soldeCompte}</td> 
                <td className="text-center"> {compte.dateCreation}</td>                                                               
          </tr>     
              );
          }else{
              return (null );
          }                 
        }
      )        
    )
  }

 render(){ 
   
  return (      
      <div className="container">
        {
         this.state.isCompteEP  &&  
          <Fragment>
            <h3>Liste des Comptes Epargnes</h3>      
            <table>
              <thead> 
                    <tr>
                      <th className="text-center">Numéro de compte</th>                    
                      <th className="text-center">Désignation</th>                                       
                      <th className="text-center">Solde</th>                    
                      <th className="text-center">Date de création</th>
                  </tr> 
              </thead>
              <tbody>
                  {this.renderCompte(this.props.comptesByUser, "E")  }
              </tbody>             
          </table>
        </Fragment>
      } 
  
      {
       this.state.isCompteCC &&       
      <Fragment>
            <h3 className="mt-5">Liste des Comptes Courants</h3>         
              <table>
                <thead> 
                      <tr>
                        <th className="text-center">Numéro de compte</th>                    
                        <th className="text-center">Désignation</th>                                       
                        <th className="text-center">Solde</th>                    
                        <th className="text-center">Date de création</th>
                    </tr> 
                </thead>
                <tbody>
                    {this.renderCompte(this.props.comptesByUser, "C")  }
                </tbody>             
            </table>
        </Fragment>
      }
      {
         this.state.isCompteCC === false &&  this.state.isCompteEP === false && this.state.errorServer === false &&
         <MessageNoCompte />
      }          
    </div>
    );
 }  
}

const mapStateToProps = (state) => { 
  return {
    user : state.user,
    isAuth : state.isAuth,
    comptesByUser : state.comptesByUser   
  }
};

export default connect(mapStateToProps, null)(ConsulterCompte);
