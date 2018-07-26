var DEC = artifacts.require("DECToken");

module.exports = function(deployer) {
  deployer.deploy(DEC, 1000000000, "Decentralized Ecosystem Coorperation", "DEC");
};
