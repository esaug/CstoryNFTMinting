const CStoryCoin = artifacts.require("ERC20Basic");

module.exports = function (deployer) {
  deployer.deploy(CStoryCoin, 100000000);
};

