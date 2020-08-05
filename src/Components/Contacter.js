import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Contacter = (props) => {
 
  let [mail, setMail] = useState("");
  let [comment, setComment] = useState("");
  let [numero, setNumero] = useState("");
  let [selectedFile, setSelectedFile] = useState(null);
  let [comptes, setComptes] = useState(null);
  //let [reponseOk, setReponseOk] = useState(false);
  const [erreur, setErreur] = useState(false)
  let [submitOk, setSubmitOk] = useState(false); 
  const [message, setMessage] = useState('') 
 

  const getAllComptes = async signal => {
       
    const url = 'http://localhost:8085/banque/comptes';    
    await axios.get(url)
        .then(res => { 
        //if (_isMounted) {                    
          setComptes(res.data);
          //setReponseOk(true);                               
        //}
      })
        .then(erreur=>{
         //setError(true)
      }) 
        
  }
   
  useEffect(() => {    
    getAllComptes();
  },[]);
   
  const requeteAddContact = async  (email, comment, selectedFile, numeroCompte) => {   
    
    const url = 'http://localhost:8085/contact/addContact';   
    
    const contact = { comment: comment, mail: email, numero : numeroCompte};
    const formData = new FormData() 
    formData.append("file", selectedFile);    
    formData.append('contact', JSON.stringify(contact)); 
    const config = {
        headers: {
          "Content-Type": "multipart/form-data"        
          }
        };
        await axios({
        method: 'POST',
        url: url, 
        config,    
        data: formData      
        })
        .then(reponse => { 
          setSubmitOk(true);
          props.history.push('/consulter')                                     
        })
        .catch(erreur =>{ 
         setErreur(true);
         setSubmitOk(false);     
        });              
    }
    
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(mail === null || comment === null || selectedFile === null || numero === null){
      setMessage(true);
      setTimeout(() => {        
        setMessage(false);      
      }, 1000);       
    }else{
      requeteAddContact(mail, comment, selectedFile, numero);   
      
    }    
  }

  const handleChange = (e) =>{   
    if(e.target.type === 'email'){      
      setMail(mail = e.target.value)
    }    
    else if(e.target.type === 'textarea'){      
      setComment(comment = e.target.value)
    }
    else if(e.target.type === 'file'){  
        setSelectedFile(selectedFile = e.target.files[0])
    }
    else if(e.target.type === 'select-one'){  
      setNumero(numero = e.target.value)
    }  
  }
 
const getMappedData = () =>{
  let listItems = null;
   
  if(comptes !== null && comptes !== ''){
      listItems = comptes.map((item) =>(       
        <option key={item.numeroCompte}> {item.numeroCompte}</option>         
      )); 
       
      return (
        <select onChange={handleChange} className="custom-select" id="inputType" required>
          {listItems}
        </select>
      )    
  }else{
    return '';
  }
}
  return (     
      
      <div className="container mt-5 w-auto"> 
        {
          message && <div className="alert alert-danger mb-3" role="alert">
          Tout les champs de saisie sont obligatoires!!!
          </div>
        }
        {
          erreur && <div className="alert alert-danger mb-3" role="alert">
          Un probème est survenu lors de la soumission des données!!!
          </div>
        }
        {
          submitOk && <div className="alert alert-success mb-3" role="alert">
          Votre demande est bien prise en compte.
          </div>
        }

        <form onSubmit={handleSubmit}>
             <div className="form-group row">
                  <label htmlFor="inputType" className="col-sm-2 col-form-label">Numéro compte :</label>
                  <div className="col-sm-3">
                    { 
                      getMappedData()
                    }                 
                  </div>                 
              </div> 

              <div className="form-group">
                <label htmlFor="exampleFormControlInput2"> * Votre adresse Mail :</label>
                <input onChange={handleChange} value={mail.value} type="email" className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" />
              </div>              
            
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">* Vos commentaires :</label>
                <textarea onChange={handleChange} value={comment.value} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
              </div>
              <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">* Joindre un fichier :</label>
                  <input onChange={handleChange} type="file" className="form-control-file" id="exampleFormControlFile1"/>
              </div>
              <input className="btn btn-primary" type="submit" value="Envoyer" />
        </form>
      </div>  
  );
}

export default React.memo(Contacter);
