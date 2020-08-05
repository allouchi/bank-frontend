import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';


  function LogoutDialog (props) {

  const [open, setOpen] = React.useState(true);
 
  const handleYes = () => { 
    props.updateAuth(false);      
    setOpen(false);
  };
  
  const handleNon = () => {    
    props.updateAuth(true); 
    props.deconnecter();   
    setOpen(false);    
    props.history.push('/consulter')   
  };

  return (

    <div className="container">        
      <Dialog
        open={open}
        onClose={handleNon}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"       
      >
       
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Voulez-vous vous déconnecter?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNon} color="primary" autoFocus> Non </Button>
          <Button onClick={handleYes} color="primary"> Oui </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// dispatching plain actions
const mapDispatchToProps = dispatch => {
  return {    
    updateAuth: (auth) => dispatch({ type: "UPDATE_AUTH", value: auth })    
  }
}

export default connect(null, mapDispatchToProps)(LogoutDialog);



