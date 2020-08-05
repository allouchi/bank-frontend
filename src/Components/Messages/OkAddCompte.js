import React, {useState, useEffect} from 'react';

const OkAddCompte = ({addOk, addKo}) => {

  
    const [stateOk, setStateOk] = useState(addOk);
    const [stateKo, setStateKo] = useState(addKo);
    
    
    useEffect(() => {     

      setStateOk(addOk);
      setStateKo(addKo);

      setTimeout(() => {
        setStateOk(false);
        setStateKo(false);
      }, 2000);     

    }, [addOk, addKo]);
    
    return (
      <div>
        {
          stateOk && (<div className="alert alert-success" role="alert"> Votre compte a été ajouté avec succès !!!</div>)                   
        }
        {
          stateKo && (<div className="alert alert-danger" role="alert"> Le nouveau compte n'a pas été ajouté !!!!</div>)                     
        }
      </div>
    );
  }
  
  export default OkAddCompte;
