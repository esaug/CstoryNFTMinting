const CStoryNFT = artifacts.require("CStoryNFT");

module.exports = function (deployer) {
  deployer.deploy(CStoryNFT, "CStoryNFT", "NFT");
};

