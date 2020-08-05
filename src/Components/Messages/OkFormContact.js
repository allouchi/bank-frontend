import React from 'react';

const OkFormContact = ({addOk, addKo}) => {

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
          stateOk && (<div className="alert alert-success" role="alert"> Votre demande a été prise en compte !!!</div>)                   
        }
        {
          stateKo && (<div className="alert alert-danger" role="alert">  Votre demande n'a été prise en compte !!!!</div>)                     
        }
      </div>
    );
  }

export default OkFormContact;
