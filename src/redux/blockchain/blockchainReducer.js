

// ESTADO

const initialState = {
    loading: false,
    account: null,
    CStoryNftContract: null,
    CStoryTokenContract: null,
    CStoryMineContract: null,
    web3: null,
    errorMsg: "",
  };
  
  
  // FUNCION ACTUALIZADORA DE ESTADO 
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "PETICION_DE_CONEXION":
        return {
          ...initialState,
          loading: true,
        };
      case "CONEXION_EXITOSA":
        return {
          ...state,
          loading: true,
          account: action.payload.account,
          CStoryNftContract: action.payload.CStoryNftContract,
          CStoryTokenContract: action.payload.CStoryTokenContract,
          CStoryMineContract: action.payload.CStoryMineContract,
          web3: action.payload.web3,
        };
      case "CONEXION_FALLIDA":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT":
        return {
          ...state,
          account: action.payload.account,
        };
      default:
        return state;
    }
  };

  export default blockchainReducer