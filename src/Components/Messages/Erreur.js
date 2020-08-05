import React from 'react';

const Erreur = (props) => {
  
setTimeout(() => {
  props.history.push("/consulter");  
}, 5000);

  return (
    <div className="container alert alert-warning alert-dismissible fade show mt-5" role="alert">
      <strong>Oups!</strong> la ressource demandée n'existe pas. Vous allez être redirigé dans 5s
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
  );
}

export default Erreur;
