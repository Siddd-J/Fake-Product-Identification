const AssetTracker = artifacts.require("AssetTracker");
const Production = artifacts.require("Production");

module.exports = function(deployer) {
  deployer.deploy(AssetTracker);
  deployer.deploy(Production);
}; 