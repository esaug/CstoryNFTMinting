import store from "../store"

const fetchDataPeticion = () => {
  return {
    type: "CHECK_DATA_PETICION",
  };
};

const fetchDataExitoso = (payload) => {
  return {
    type: "CHECK_DATA_EXITOSO",
    payload: payload,
  };
};

const fetchDataFallido = (payload) => {
  return {
    type: "CHECK_DATA_FALLIDO",
    payload: payload,
  };
};

// FETCH DATA DE LA BLOCKCHAIN

export const fetchData = (account) => {
  
  return async(dispatch)=>{


    dispatch(fetchDataPeticion());

      try {

        
        store.getState().blockchain.CStoryNftContract.options.address = '0x2A135BB1f2BC871b16634175109BF1F6625BE324'

        let allStoryNfts = await store
        .getState()
        .blockchain.CStoryNftContract.methods.getTrajeNFT()
        .call();

        let allOwnerStoryNfts = await store
        .getState()
        .blockchain.CStoryNftContract.methods.getOwnerTrajeNFT(account)
        .call();

        
        

       dispatch(
        fetchDataExitoso({
          allStoryNfts,
          allOwnerStoryNfts,
          
        })
       ) 

        console.log(allStoryNfts)

        console.log(allOwnerStoryNfts)


      } catch (error) {

        dispatch(fetchDataFallido("Could not load data from contract."));

      }


  }
      
      
    }

