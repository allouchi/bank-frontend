

import React from 'react';

const MsgNoCompte = () => {
  return (
    <div>
      <div className="container alert alert-warning alert-dismissible fade show mt-5" role="alert">
        <strong>Oups!</strong> Le client ne possède pas de compte !!!!
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
  </div>
  );
}

export default MsgNoCompte;
