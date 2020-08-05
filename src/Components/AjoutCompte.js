import React, {useRef, useState} from 'react';


const AjoutCompte = ({userId, addCompteFunc, annulerAjoutFunc}) => {

    const refNom = useRef(null);
    const refSolde = useRef(null);
    const refType = useRef(null);
    const [isWarninig, setIsWarninig] = useState(false);  
   
    
    const handleSubmit = (e)=> {
      e.preventDefault();
      const compteNom = refNom.current.value; 
      const solde = refSolde.current.value;
      const type = refType.current.value; 

      if (isNaN(solde)){
        setIsWarninig(true);
        setTimeout(() => {
          setIsWarninig(false)
        }, 2000);
      }else{
        if(compteNom !== '' && solde !== '' && type !== '' ){          
          addCompteFunc(compteNom, solde, type, userId);
        }
      }     
            
      refSolde.current.value='';
      refNom.current.value='';
      refType.current.value='';       
    }  
    
    const handleAnnuler = () => {
      annulerAjoutFunc();
    }
      
  return (    
            <form onSubmit={handleSubmit}>
              {
                isWarninig ? (
                <div className="alert alert-warning" role="alert">
                     Le solde doit-être de type numérique !!!
                </div>) : 
                (null)
              }              

              <div className="form-group row">
                  <label htmlFor="inputNom" className="col-sm-2 col-form-label">Nom compte :</label>
                  <div className="col-sm-3">
                    <input ref={refNom} type="text" className="form-control" id="inputNom" />
                  </div>
              </div>
              <div className="form-group row">
                  <label htmlFor="inputType" className="col-sm-2 col-form-label">Type compte :</label>
                  <div className="col-sm-3">
                    <select  ref={refType}  className="custom-select" id="inputType" required>
                      <option value="">Choix</option>
                      <option value="E">Epargne</option>
                      <option value="C">Courant</option>
                    </select>
                  </div>
                  <div className="invalid-feedback">
                    Type compte
                  </div>
              </div>

              <div className="form-group row">
                  <label htmlFor="inputSolde" className="col-sm-2 col-form-label">Solde :</label>
                  <div className="col-sm-3">
                    <input ref={refSolde} type="text" className="form-control" id="inputSolde" />
                  </div>
              </div>
              
              <div className="btn-toolbar">
                <button
                      type="submit"
                      className="btn btn-primary mr-5"> 
                      Valider                        
                </button>
                <button onClick={handleAnnuler}
                      type="text"
                      className="btn btn-primary ml-5"> 
                      Annuler                        
                </button>
              </div>             
            </form>           
  );
}
export default AjoutCompte;
