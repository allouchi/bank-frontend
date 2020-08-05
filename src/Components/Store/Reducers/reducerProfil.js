

const initialState = { user : null, isAuth : false, comptesByUser : []  }


function reducerProfil(state = initialState, action) { 
   //console.log("action.value ", action.value, action.type);
    switch(action.type){
      case 'UPDATE_USER':
        return {
          ...state,
          user: action.value
        };
        
        case 'UPDATE_COMPTES':
          return {
            ...state,
            comptesByUser: action.value
          };
        case 'UPDATE_AUTH':
          return {
            ...state,
            isAuth: action.value
          };
      default :
        return state;
    }
  }

  export default reducerProfil;
