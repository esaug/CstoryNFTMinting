import { isConstructorDeclaration } from "typescript";
import Web3 from "web3";
import CStoryNft from "../../contracts/CStoryNFT.json";
import CStoryCoin from "../../contracts/ERC20Basic.json";
import main from "../../contracts/main.json"
import { fetchData } from "../data/dataActions.js"



// FUNCIONES QUE ACTUALIZAN EL ESTADO

const conexionRequest = () => {
    return {
      type: "PETICION_DE_CONEXION",
    };
  };
  
  const conexionExitosa = (payload) => {
    return {
      type: "CONEXION_EXITOSA",
      payload: payload,
      
    };
  };
  
  const conexionFallida = (payload) => {
    return {
      type: "CONEXION_FALLIDA",
      payload: payload,
    };
  };
  
  const updateAccountRequest = (payload) => {
    return {
      type: "UPDATE_ACCOUNT",
      payload: payload,
    };
  };

  // FUNCION QUE CONECTA AL METAMASK, EXTRAE LOS DATOS DE WEB3 Y DEL CONTRADO 

  export const conexion =  () =>{
      
    return async (dispatch)=>{

      dispatch(conexionRequest())

      try {
       
        if(typeof window.ethereum !== 'undefined'){
      
          let web3 = new Web3(window.ethereum)
          let web32 = new Web3()
          let web33 = new Web3()

          web32.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));
          web33.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

         const account = await window.ethereum.request({
            method: "eth_requestAccounts"
          })

          const networkId = await window.ethereum.request({
            method: "net_version"
          }) 


          const connectionNetwork = 5777

          //EXTRACION DATOS DEL CONTRATO 

           if(connectionNetwork){

              const CStoryNftContrato = new web3.eth.Contract(
                CStoryNft.abi,
                CStoryNft.address
              )

              const CStoryToken = new web32.eth.Contract(
                CStoryCoin.abi,
                CStoryCoin.address
              )

              const CStoryMine = new web33.eth.Contract(
                main.abi,
                main.address
              )
              
            
              dispatch(conexionExitosa({
          
                  account: account[0],
                  CStoryNftContract: CStoryNftContrato,
                  CStoryTokenContract: CStoryToken,
                  CStoryMineContract: CStoryMine,
                  web3: web3
              
              }))

        

              fetchData(dispatch)
           }


      } else {
        dispatch(conexionFallida("Worng network"));
      }

      } catch (error) {
        dispatch(conexionFallida("Metamask is not installed."))
      }

    }


      
    
    }
      // CAPTURA DE LA CUENTA METAMASK Y EL CONTRATO 
      
export const updateAccount = (account) => {
  return async (dispatch) => {
      dispatch(updateAccountRequest({ account: account }));
      dispatch(fetchData(account));
      console.log("PROBANDO ACTIONS" + account)
        };
      };
        
