import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
//import {useDispatch, useSelector} from "react-redux"
import {conexion} from "./redux/blockchain/blockchainActions"
import { fetchData } from './redux/data/dataActions';
import store from "./redux/store"
import Nft from "./components/nft"
import { isMetaProperty } from 'typescript';
import NftRender from './components/nft';
import {
  BrowserRouter,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import MenuNav from './components/nav';
import Exchange from './components/exchange';


//import TokenPruebas from './components/token';

  
  // Conexion al juego y vista principal  
         

const min = 30
const max = 45
const minMattk = 150
const maxMattk = 200
const minAttk = 200
const maxAttk = 300

const _token = "0xb1668A37e0e71f7CbbB59c010Db0D63633c86A2D"
const address = "0x323D10bB37De64726227a6D07284cda6f74aB173"
const priceNFT = 10000
const owner = '0xdfbe7fA2e97fad2cFFf9F0d01573c140FF911b02'
const receiberPrueba = '0xb24d78f866be8Fc7015d4fcE9b77EC7c9B6FF983'


function App() {


    const dispatch = useDispatch()
    const blockchain = useSelector((store)=>  store.blockchain)
    const data = useSelector((store) => store.data)


    // RANDOM STATS 

    const randomStr = () =>{
      return Math.floor(Math.random()*(max-min+1)+min)
    }

    const randomDex = () =>{
      return Math.floor(Math.random()*(max-min+1)+min)
    }

    const randomLuk = () =>{
      return Math.floor(Math.random()*(max-min+1)+min)
    }

    const randomInt = () =>{
      return Math.floor(Math.random()*(max-min+1)+min)
    }

    const randomMattk = () =>{
      return Math.floor(Math.random()*(maxMattk-minMattk+1)+minMattk)
    }

    const randomAttk = () => {
      return Math.floor(Math.random()*(maxAttk-minAttk+1)+minAttk)
    }

  
    // FUNCION DE MINTEO

  
    const MintNFT = (_account, _name, _Str, _Dex, _Luk, _Int, _Wattk, _Mattk, _Type, _Class)=>{
    
      blockchain.CStoryNftContract.options.address = '0x2A135BB1f2BC871b16634175109BF1F6625BE324'
   
      blockchain.CStoryNftContract.methods.createRandomNFT( _name, _Str, _Dex, _Luk, _Int, _Wattk, _Mattk, _Type, _Class)
      .send({
        from: _account,
        value: 1000000000000000000

      }).then((receipt) => {
        

        console.log(receipt);
        dispatch(fetchData(_account));
        console.log("TRAJES DEL PROPIETARIO" + data.allOwnerNFTs)  
        console.log(blockchain.CStoryNftContract.methods.balanceContrato())
      })};




      // PAGO DEL NFT 

      const pago = (receiber, priceNFT) =>{


        blockchain.CStoryTokenContract.options.address = '0x4EE2FaEeDbc6470dDb357D90cfF89658F9551355'

        blockchain.CStoryTokenContract.methods.transfer(receiber, priceNFT)
        .send({
          from: owner,
        }).then((results)=>{
          console.log(results)
        })

      
      }
      


    useEffect(()=>{
    
      if(blockchain.account != "" || blockchain.CStoryNftContract != null){
        dispatch(fetchData(blockchain.account))
       
        
      }
    },[blockchain])


  return(
    <div className='flex flex-col'>

        
    
        {blockchain.account === "" || blockchain.CStoryNftContract === null ? (
        
          <button onClick={async(e)=>{
          e.preventDefault()
          dispatch(conexion())
          console.log("CUENTA:" + blockchain.account)
          }}>
          conectar
          </button> 
      
        ):(

          <div>
            
            <div>
              
            </div>

            <button onClick={(e)=>{
            e.preventDefault();
            MintNFT(blockchain.account ,"Admin", randomStr(), randomDex(), randomLuk(), randomInt(), randomMattk(), randomAttk(), "Warrior", "Paladin", 2)

          }}
          >Mint Commond</button>

          <button onClick={(e)=>{
            e.preventDefault();
            MintNFT(blockchain.account ,"Admin", randomStr(), randomDex(), randomLuk(), randomInt(), randomMattk(), randomAttk(), "Warrior", "Paladin", 2)
          }}
          >Mint Epic</button>

          <button onClick={(e)=>{
            e.preventDefault();
            MintNFT(blockchain.account,"Admin", randomStr(), randomDex(), randomLuk(), randomInt(), randomMattk(), randomAttk(), "Warrior", "Paladin", 3)
          }}
          >Mint Legendary</button>

          </div>
          

        )}

        <div>
          
            <div>
              <p>You Wallet: {blockchain.account}</p>
              <p>Your NFT</p>
            <div className="flex-row">
              {data.allOwnerNFTs.map((item, index) => {
                  return(
                    <div key={index}>
                      <NftRender Nft = {item}/>  
                    </div>
                  )
                })}
            </div>
            
            </div>
          </div>

              <Exchange blockchainDatos = {blockchain}/>
    </div> 
        )  
        
      
}

export default App;
 