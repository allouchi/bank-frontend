import React, { Component, Fragment } from 'react';

class EditerCompte extends Component {   

    constructor(props){
        super(props);
        this.state = {
            id : this.props.compteToEdit.id,
            typeCompte : this.props.compteToEdit.typeCompte,
            numeroCompte : this.props.compteToEdit.numeroCompte,
            nomCompte : this.props.compteToEdit.nomCompte, 
            soldeCompte : this.props.compteToEdit.soldeCompte, 
            dateCreation : this.props.compteToEdit.dateCreation,
            btnValider : false                              
        };        
    }  
   
    componentDidUpdate(prevProps, prevState){        
        if(prevState.soldeCompte !== this.state.soldeCompte 
            || prevState.dateCreation !== this.state.dateCreation){
                this.setState({
                    btnValider : true
                });
        }
    }

    handleSolde = (evt)=> {       
        let tdElem = document.getElementById ( "tdSolde" ).innerText; 
        tdElem = Number(tdElem);    
        this.setState({
            soldeCompte : tdElem
          });   
     };

    handleDate = (evt)=> {
        let tdElem = document.getElementById ( "tdDateCreation" ).innerText; 
        
        this.setState({
            dateCreation : tdElem
          });    
     }; 
    
    handleValider = ()=> {   
       
        this.props.editerCompteFunc(
        this.props.compteToEdit.id,
        this.props.compteToEdit.numeroCompte, 
        this.props.compteToEdit.nomCompte,
        this.props.compteToEdit.typeCompte, 
        this.state.soldeCompte, 
        this.state.dateCreation);    
                  
    };
       
    handleAnnuler = (e)=> {       
        this.props.annulerEditFunc();          
    }

    render() { 

        const btnDisplay = this.state.btnValider ? (<div className="col">
        <button  className="btn btn-primary col-3" 
                onClick = {this.handleValider} type="text" > Valider </button>  
        </div>) 
        : (<div className="col">
                <button disabled className="btn btn-primary col-3" 
                onClick = {this.handleValider} type="text" > Valider </button>  
          </div>);                
        return ( 

        <Fragment>                
            <table className="table table-bordered table-responsive-md table-striped text-center">
                    <thead>
                        <tr>
                            <th className="text-center">Numéro du compte</th>
                            <th className="text-center">Nom</th>
                            <th className="text-center">Solde</th>
                            <th className="text-center">Date de création</th>           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="tdNumero" className="pt-3-half" contenteditable="false" >
                              {this.props.compteToEdit.numeroCompte}
                            </td>
                            <td id="tdNom" className="pt-3-half" contenteditable="false">
                                {this.props.compteToEdit.nomCompte} 
                            </td>
                            <td id="tdSolde" className="pt-3-half" contenteditable="true" onBlur={this.handleSolde}>
                                {this.state.soldeCompte} 
                            </td>
                            <td id="tdDateCreation" className="pt-3-half" contenteditable="true" onBlur={this.handleDate}>
                                {this.state.dateCreation} 
                            </td>           
                        </tr>        
                    </tbody>
                </table>        
         
                <div className="row justify-content-between mt-4">
                    {
                         btnDisplay
                    }
                    <div className="col">
                            <button className="btn btn-primary col-3" 
                            onClick = {this.handleAnnuler}  type="text" > Annuler </button> 
                    </div>              
                </div>        
        </Fragment>
        )   
    }   
}

export default EditerCompte;
