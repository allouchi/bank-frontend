import React, {useState} from 'react';
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import { connect } from 'react-redux';

const SeConnecter = (props) => {
  const data = {
    mail : '',
    password : ''   
  } 

  const [loginData, setLoginData] = useState(data);  
  const [login , setLogin ] = useState('');
  const [error, setError] = useState('');
  
  const requeteComptesParUserId = (user) => {
      let userId = user.userId;
      const url = `http://localhost:8085/banque/comptes`;
      axios.get(url, userId)
      .then(result => {       
        props.updateComptesByUserId(result.data);
      })
      .catch(error => { 
        console.log("error : ", error); 
      });
  }

  const requeteUpdateUserDateConnetion = (userId) => {    
    const url = `http://localhost:8085/userService/user`;   
    axios({
    method: 'put',
    url: url,
    data: userId,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
   .then(function (response) {
     if (response.status === 200) {
       console.log("Update Success");
       //resolve();
     }
   })
   .catch(function (response) {
     console.log(response);
     //resolve();
   });
  }

  const requeteCheckUser = (email, password) => {    
    const url = `http://localhost:8085/userService/user`;

    axios.get(url, {
        params: {
          email: email,
          password : password
          }
        })
        .then(response => {          
          const user = response.data;             
          if(user !== null && user !== ''){            
            setLogin(true);
            setLoginData({...data});
            requeteComptesParUserId(user); 
            props.updateUser(user);
            props.updateAuth(true);
            requeteUpdateUserDateConnetion(user.userId)                     
            props.history.push('/consulter');                    
                      
          } else {
            setLogin(false);
            setLoginData({...data});
            props.updateAuth(false);  
          }                                    
        })
        .catch(error => {          
          if(error.response !== null && error.response.status === 404){         
            setError(error.response.data) 
            setLoginData({...data});            
          }else if (error.response !== null && error.response.status === 500){
            setError("Problème technique. Veuillez réessayer plus tard!!!"); 
          }               
        }) 
    }  

  const handleSubmit = (e)=>{
    e.preventDefault();    
    requeteCheckUser(mail, password);            
  }

  const handleChange = (e) =>{    
    setLoginData({...loginData, 
      [e.target.id] : e.target.value
    });      
  }
  
  const {mail, password} = loginData; 
  const erreurMsg = error !== '' && 
      <div className="alert alert-danger" role="alert">
              {error}
      </div>    
  const msgLogin = login === false  ? 
  <div className="container mb-3">Votre identifiant ou mot de passe n'a pas été vérifié !!</div> : ('');  
  const btnSubmit = mail === '' || password === '' ? (  
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">          
        <input disabled className="btn btn-primary" type="submit" value="Envoyer" />
      </div>
    </div>) 
 : (
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">          
          <input  className="btn btn-primary" type="submit" value="Envoyer" />
        </div>
      </div>
    );

  return (
   
    <div className="container mt-5 w-auto">
      {erreurMsg}
      {msgLogin}
      <h2 className="container">Se connecter : </h2>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group">
        <label  onChange={handleChange} className="control-label col-sm-2" htmlFor="email">Email:</label>
        <div className="col-sm-10">
          <input onChange={handleChange} value={mail} id = "mail" type="mail" className="form-control"  placeholder="Email" />
        </div>
      </div>
      <div className="form-group">
        <label className="control-label col-sm-2" htmlFor="pwd">Mot de passe:</label>
        <div className="col-sm-10">
          <input onChange={handleChange} value={password} id = "password" type="password" className="form-control"  placeholder="Mot de passe" />
        </div>
      </div>
      {btnSubmit}
   </form>
       <div className="linkContainer"> 
          <Link className="mt-3" to="/recupmdp">Mot de passe oublié?</Link>
       </div>
   </div>
  );
}

// dispatching plain actions
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch({ type: "UPDATE_USER", value: user }),
    updateAuth: (auth) => dispatch({ type: "UPDATE_AUTH", value: auth }),  
    updateComptesByUserId :  (comptes) => dispatch({ type: "UPDATE_COMPTES", value: comptes })  
  }
}

export default connect(null, mapDispatchToProps)(SeConnecter);