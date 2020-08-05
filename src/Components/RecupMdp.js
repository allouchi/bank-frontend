import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'; 

const RecupMdp = (props) => {

    const [mail, setMail] = useState("");
    const [error, setError] = useState("");
           
    const requeteRecupMdp = () => {              
        const url = `http://localhost:8085/banque/compte/${mail}/`;        
        axios.get(url)
            .then(mdp => {
              const password = mdp.data;
              if(password !== ''){
                props.displayMdp(password); 
                props.history.push("/signup");                
              }else{
                setMail("");
                setError("L'adresse mail saisie");                
              }                                                               
            })
            .catch(erreur => {                         
              setError("Problème technique. Veuillez réessayer plus tard!!!");        
            }) 
    }  

    const handleSubmit = (e)=>{        
        e.preventDefault();                
        requeteRecupMdp();              
    }    
    const handleChange = (e) =>{        
       setMail(e.target.value);      
    }
    const msgDisplay = error !== '' ? 
        (<div className="alert alert-danger" role="alert">
           {error}
        </div>) : (null);
    return (
      
      <div className="container mt-5 w-auto"> 
        {msgDisplay}       
      <h4> Mot de passe oublié?</h4>
      <form className="form-horizontal mt-4" onSubmit={handleSubmit}>
        <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email : </label>
            <div className="col-sm-10">
                <input onChange={handleChange} 
                  type="email" 
                  className="form-control" id="inputEmail3" required/>
            </div>
        </div>  

        <div className="form-group row">
          <div className="col-sm-10">
              <button  onSubmit= {handleSubmit} 
                type="submit" 
                className="btn btn-primary">Envoyer</button>
          </div>
        </div>  
      </form>    
       <div className="linkContainer"> 
          <Link className="mt-4" to="/signup">Se connecter?</Link>
       </div>
   </div>
  );
}

export default React.memo(RecupMdp);
