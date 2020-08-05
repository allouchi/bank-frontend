import React, {Component, Fragment} from 'react';
import axios from 'axios';
import AjoutCompte from './AjoutCompte';
import EditerCompte from './EditerCompte';
import OkAddCompte from './Messages/OkAddCompte'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ContextUser from './ContextUser';
import { connect } from 'react-redux';

class GererCompte extends Component {

  state = {
    myComptes : [],
    typeCompte : "E",
    isLoading : false,
    isCompteCC: false,
    isCompteEP : false,
    error : null,
    toEditeCompte : false,
    torequeteDeleteCompte : false,
    toAddCompte : false,
    btnAddCompte : true,
    numeroToEdit : 0,
    addNewCompte : false,
    confirmDelete : false,
    addOk : false,
    addKo : false,
    updateOk : false,   
    compteToEdit : {  
        id : 0,     
        typeCompte : 'E',
        numeroCompte : 0,
        nomCompte : '',
        solde : 0,
        dateCreation :  null
    },    
    compteModifie : {
      id : 0,
      numeroCompte : 0,
      nomCompte : '',
      solde : 0,
      dateCreation :  null
    } 
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.comptesByUser !== this.props.comptesByUser){
      this.updateLigneCompte( this.props.comptesByUser);       
    }           
  }
  
  componentDidMount() {  
    const comptes = this.props.comptesByUser;
    
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
    }else {
      this.setState({
        isCompteCC : false,
        isCompteEP : false
      });   
    }       
  }  

  updateLigneCompte = (comptes) =>{    
    this.setState({
      isCompteCC : false,
      isCompteEP : false
    })
    
    if(comptes.length > 1){
      for (let index in comptes) {
        let type = comptes[index].typeCompte;        
        if(type === 'E'){
                
          this.setState({            
            isCompteEP : true
          });                  
        }else if(type === 'C'){ 
                  
          this.setState({
            isCompteCC : true
          });          
        }    
      }      

    }else if(comptes !== '' && comptes !== undefined && comptes[0] !== undefined) {     
      
      const type = comptes[0].typeCompte;

      if(type === 'E'){                 
        this.setState({                  
          isCompteEP : true
        });                  
      }else if(type === 'C'){                           
        this.setState({
          isCompteCC : true
        });          
      } 
    }          
  }   

  requeteAddNewCompte = (newCompte) =>{   
        
    const url = 'http://localhost:8085/banque/compte';

    axios({
      method: 'POST',
      url: url,
      data: newCompte
      })
      .then((reponse) => {       
        this.setState({
          addOk : true,
          addKo : false
        })                
      })
      .catch((erreur) =>{      
        this.setState({
          addOk : false,
          addKo : true
        })       
      });      
  }
  
  requeteDeleteCompte = (code) =>{      
    const url = `http://localhost:8085/banque/compte/${code}`;  
    axios.delete(url); 
  }

  requeteUpdateCompte = (compteModifie) =>{
    const url = `http://localhost:8085/banque/compte`;   
    axios.put(url, compteModifie)
        .then(res => console.log(res.data));
  }

  addCompteFunc = (newName, newSolde, newTypeCompte, userId ) => {     
    
    const lg = this.props.comptesByUser.length;
    let index;
    let max = 0;
    let copieComptes = null;
   
    if(lg > 0){
      copieComptes = this.props.comptesByUser.slice();
      let numeroCompte = copieComptes[0].numeroCompte;        
      max = numeroCompte.substring(3, numeroCompte.length);     
      for (index = 0; index < copieComptes.length; index++) {
        if (copieComptes[index].numeroCompte > max) {
          let l = copieComptes[index].numeroCompte.length;
          max = copieComptes[index].numeroCompte.substring(3, l);
        }
      }
      max = parseInt(max) + 10;
      
    }else{
      max = 1000;      
    }    
      
    if(newTypeCompte === 'C'){
      max = "CCP0000"+max;
    }else{
      max = "EPA0000"+max;
    } 
    
    const nouveauCompteTab  = [
      {
        id : 0,
        userId : userId,
        numeroCompte : max, 
        nomCompte: newName, 
        soldeCompte : newSolde, 
        typeCompte : newTypeCompte,
        dateCreation : this.getDate()
      }
    ]

    const nouveauCompteObj  = 
      {
        id : 0,
        userId : userId,
        numeroCompte : max, 
        nomCompte: newName, 
        soldeCompte : newSolde, 
        typeCompte : newTypeCompte,
        dateCreation : this.getDate()
      }  

    if( lg > 0 ){          
      copieComptes.push(nouveauCompteObj);      
      this.updateLigneCompte(copieComptes);
      this.props.updateComptesByUserId(copieComptes);        
    }else{    
      
      this.updateLigneCompte(nouveauCompteTab);
      this.props.updateComptesByUserId(nouveauCompteTab);          
    }    
    
    this.setState({ 
      toAddCompte: false,
      btnAddCompte : true,
      addNewCompte : true    
    });   
    this.requeteAddNewCompte(nouveauCompteObj);  
  } 

  alertConfirm = (confirm) => {
    if(confirm === true){
      this.setState({confirmDelete : true})
    }else{
      this.setState({confirmDelete : false})
    }       
  } 

  handleSupprimerCompte = (numeroToDelete)=> {    
    let confirm = window.confirm('Etes-vous sûr de supprimer ce compte?');        
    if(confirm === true){
      const copieComptes = this.props.comptesByUser.slice();    
      const index = copieComptes.findIndex(function(compte){ 
        if(compte.numeroCompte === numeroToDelete ){                               
          return true;
        }else{
          return false;
        }         
      });    
      copieComptes.splice(index, 1);
      this.setState({       
        btnAddCompte : true,
        toAddCompte : false,
        isCompteEP : false,
        isCompteCC : false,
        addOk: false,
        addKo: false              
      })       
      
      this.requeteDeleteCompte(numeroToDelete); 
      this.props.updateComptesByUserId(copieComptes);            
    }    
  }

  annulerEditFunc = () => {    
    this.setState({
      toAddCompte : false,
      toEditeCompte : false
    });    
  }

  editerCompteFunc = (id, newNumero, newName, newType, newSolde, newDate) => {    
     
    let confirm = window.confirm('Etes-vous sûr de modifier ce compte?');   

    if(confirm === true) {
      const copieComptes = this.props.comptesByUser.slice();    
      const index = copieComptes.findIndex(function(compte){ 
        if(compte.numeroCompte === newNumero ){                         
          return true;
        }else{
          return false;
        }         
      });

      let userId = this.props.user.userId;
      const compteModifie = {
        id : id, 
        userId : userId,     
        typeCompte : newType,
        numeroCompte :  newNumero,
        nomCompte : newName,
        soldeCompte : newSolde,
        dateCreation : newDate
      } 
  
      copieComptes.splice(index, 1);
      copieComptes.push(compteModifie);
  
      this.setState({        
        toEditeCompte : false,     
      }) 
     
      this.props.updateComptesByUserId(copieComptes); 
      this.requeteUpdateCompte(compteModifie);   
         
    }else{
      this.setState({
        toEditeCompte : false
      })
    }      
  }

  handleEditerCompte = (compte)=> {          
    this.setState({      
      toEditeCompte : true,
      numeroToEdit : compte.numeroCompte,
      compteToEdit : { 
        id : compte.id,      
        typeCompte : compte.typeCompte,
        numeroCompte :  compte.numeroCompte,
        nomCompte : compte.nomCompte,
        soldeCompte : compte.soldeCompte,
        dateCreation : compte.dateCreation
      }
    });    
  }

  getDate = () =>{
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
     today = dd+'/'+mm+'/'+yyyy;     
     return  today;   
  }

  annulerAjoutFunc = () => {    
    this.setState({
      toAddCompte : false,
      btnAddCompte : true
    })
  }

  handleAjoutCompte = ()=> {    
    this.setState({     
      toAddCompte : true,
      btnAddCompte : false,
      addOk: false,
      addKo: false
    });      
  }
 
  renderCompte = (comptes, type)=> { 
     
    return(
      comptes.map((compte, index) => {

            if(compte.typeCompte === type) {              
                return (
                  <tr key={index} className="selected">
                  <td className="text-center"> {compte.numeroCompte}</td>                 
                  <td className="text-center"> {compte.nomCompte}</td>              
                  <td className="text-center"> {compte.soldeCompte}</td> 
                  <td className="text-center"> {compte.dateCreation}</td>
                  <td className="text-center border none">
                    <button 
                        type="button"
                        className="btn btn-outline-info" 
                        onClick={() => this.handleEditerCompte(compte)}>
                            Editer Compte
                    </button>
                  </td>
                  <td className="text-center border none">
                  <button 
                        type="button"
                        className="btn btn-outline-danger" 
                        onClick={() => this.handleSupprimerCompte(compte.numeroCompte)}>
                            Supprimer Compte
                    </button>
                  </td>                             
             </tr>     
                );
            }else{
                return  (null);                
            }           
        }
      )        
    )
  }

 render(){

   const toEditCompte =  this.state.toEditeCompte;
   const toAddCompte =  this.state.toAddCompte;
   const btnAddCompte =   this.state.btnAddCompte;  
   const isCompteEP = this.state.isCompteEP;
   const isCompteCC = this.state.isCompteCC; 
   const typeCompteDisplay = this.state.compteToEdit.typeCompte === 'C' 
     ? ( "Compte Courant") : ("Compte Epargne");    
  
   return (    
         
      <Fragment>
      <div className="container"> 
          {             
            <OkAddCompte addOk={this.state.addOk} addKo={this.state.addKo}/>          
          }     
      </div>            

      <div className="container">              
      {          
          isCompteEP  &&  toAddCompte === false && toEditCompte === false && 
          <Fragment>
            <h3>Liste des Comptes Epargnes</h3>            
            <table>
              <thead> 
                    <tr>
                      <th className="text-center">Numéro du compte</th>                   
                      <th className="text-center">Nom</th>                                       
                      <th className="text-center">Solde</th>                    
                      <th className="text-center">Date de création</th>
                  </tr> 
               </thead>
               <tbody>
                   {this.renderCompte(this.props.comptesByUser, "E")}  
               </tbody>             
          </table>     
          </Fragment>                 
      }      
      {    
          isCompteCC &&  toAddCompte === false && toEditCompte === false &&       
              <Fragment>           
                <h3 className="mt-3">Liste des Comptes Courants</h3>  
                  <table>
                    <thead> 
                          <tr>
                            <th className="text-center">Numéro du compte</th>                   
                            <th className="text-center">Nom</th>                                       
                            <th className="text-center">Solde</th>                    
                            <th className="text-center">Date de création</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {this.renderCompte(this.props.comptesByUser, "C")}                
                    </tbody>             
                </table>                    
        </Fragment>        
      }      
      {          
          toAddCompte && toEditCompte === false ? (
             <div className="mt-3">                
                <h3>Ajouter compte</h3> 
                <ContextUser.Consumer> 
                 {
                  user => {
                    return(
                      <AjoutCompte userId ={this.props.userId} addCompteFunc={this.addCompteFunc} annulerAjoutFunc={this.annulerAjoutFunc}/> 
                    );
                  }               
                } 
                </ContextUser.Consumer> 
              </div>
            ) : (null)
      }
      {          
          btnAddCompte && toEditCompte === false ? (
            <div className="mt-3">
            <button
                type="button"
                className="btn btn-outline-success" 
                onClick={() => this.handleAjoutCompte()}>
                      Ajouter Compte
              </button>
          </div>
            ) : (null)
      }      
        
      {          
          toEditCompte ? (
             <div className="mt-3">                
                <h3>Edition du {typeCompteDisplay} numéro : {this.state.numeroToEdit} </h3>                      
                  <EditerCompte compteToEdit={this.state.compteToEdit} editerCompteFunc={this.editerCompteFunc} annulerEditFunc={this.annulerEditFunc}  /> 
              </div>
            ) : (null)
      }        
    </div> 

    </Fragment>       
    );
 }  
}

const mapStateToProps = (state) => {  
  return {
    user : state.user,
    userId : state.user.userId,
    isAuth : state.isAuth,
    comptesByUser : state.comptesByUser       
  }
};

// dispatching plain actions
const mapDispatchToProps = dispatch => {  
  return {     
    updateComptesByUserId :  (comptes) => dispatch({ type: "UPDATE_COMPTES", value: comptes })  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GererCompte);
