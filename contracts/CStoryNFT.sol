// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


// NFT 

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CStoryNFTPrivate is ERC721, Ownable {


    address public contrato;
    string public baseTokenURI;

    bool public saleIsActive = false;



    // counter NFF

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

     constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        contrato = address(this);
    }

    uint256 COUNTER;

    address payable public buyer;


    uint public constant MAX_SUPPLY = 5;
    uint public constant MAX_PER_MINT = 3;
    uint256 public contador;

    uint256 public constant cost = 80000000000000000;


    // PLANTILLA NFT 

  
    struct TrajeNFT {
       string Name;
       uint256 id;
       uint256 Str;
       uint256 Dex;
       uint256 Luk;
       uint256 Int;
       uint256 Wattk;
       uint256 Mattk;
       string Type;
       string Class;
       uint256 level;
       uint256 rarity;
    }

     event newStoryN(address indexed owner, uint256 id);


    TrajeNFT [] public TrajesNFT;


    //random number function 

    function _createRandomNumber(uint256 _mod) internal view returns(uint256){

        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;

    }

   /* function updateFee(uint256 _fee) external  onlyOwner(){
        fee = _fee;
    } */

    //funcion de retiro del nft hacia la billetera

    function withdraw()external payable onlyOwner(){

        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);

    }

     function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }



    function _createNFT(string memory _name, uint256 _id, uint256 _Str, uint256 _Dex, uint256 _Luk, uint256 _Int, uint256 _Wattk, uint256 _Mattk, string memory _Type, string memory _Class) internal{
        


        uint8 randRarity1 = uint8(_createRandomNumber(100));
        //uint256 randDnA = uint256(_createRandomNumber(10**16));
      //uint256 randId = uint256(_createRandomNumber(10000));
        
        //Crear NFT y GUARDARLO UN ARRAY 

        
        
        TrajeNFT memory newTrajeNFT = TrajeNFT(_name, _id, _Str, _Dex, _Luk, _Int, _Wattk, _Mattk, _Type, _Class, 1, randRarity1);
        TrajesNFT.push(newTrajeNFT);

        
        

        // MINTEAR NFT

        _safeMint(msg.sender, COUNTER);
        emit newStoryN(msg.sender, COUNTER);
        COUNTER++;

        //block again

        if(contador == MAX_SUPPLY){
            flipSaleState();
        }

    }
    
    function createRandomNFT( string memory _name,uint256 _Str, uint256 _Dex, uint256 _Luk, uint256 _Int, uint256 _Wattk, uint256 _Mattk, string memory _Type, string memory _Class) public payable{
    
        
        require(saleIsActive, "Sale must be active to mint");
        
        _tokenIdCounter.increment();
        contador = _tokenIdCounter.current();

        

        // condiciones
        
        require(contador <= MAX_SUPPLY, "Purchase would exceed max supply");
        require(msg.value >= cost, "Not enough ETH sent: check price.");
        uint returnValue = msg.value - cost;
        payable(msg.sender).transfer(returnValue);


        _createNFT(_name, contador,_Str, _Dex, _Luk, _Int, _Wattk, _Mattk, _Type, _Class);
    } 

    //GETTER NFT

    function getTrajeNFT() public view returns(TrajeNFT[] memory){

        return TrajesNFT;

    }

    function getOwnerTrajeNFT(address _owner) public view returns (TrajeNFT[] memory){
        
        TrajeNFT[] memory result = new TrajeNFT[](balanceOf(_owner)); 
        uint256 counter1 = 0;
        for (uint256 i = 0 ; i < TrajesNFT.length; i ++){
            if(ownerOf(i) == _owner) {
                result[counter1] = TrajesNFT[i];
                counter1 ++;
            }   
        }
        return result ;

    }


    function getContract() public view returns (address){
        return contrato;
    }

    function balanceContrato() public view returns (uint) {
        return balanceOf(contrato);
    }


    


    // RESERVA DE NFT 

   

}
