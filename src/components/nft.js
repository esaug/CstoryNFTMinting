import { render } from "@testing-library/react";
import { data } from "autoprefixer";
import React from "react";

function NftRender (props){
    
    return(
        <div>
               
        <div>
            <p>IMAGEN DEL NFT</p>
            <img/>
        </div>


        <div >
          <br/>
          <div>Name:{props.Nft.Name}</div>
          <div>Str:{props.Nft.Str}</div>
          <div>Dex:{props.Nft.Dex}</div>
          <div>Luk:{props.Nft.Luk}</div>
          <div>Int:{props.Nft.Int}</div>
          <div>Mattk:{props.Nft.Mattk}</div>
          <div>Wattk:{props.Nft.Wattk}</div>
          <div>Type:{props.Nft.Type}</div>
          <div>Class:{props.Nft.Class}</div>
          <div>Rarity:{props.Nft.rarity}</div>
          <br/>
        
        </div>
   
      </div>
    )
}

export default NftRender
