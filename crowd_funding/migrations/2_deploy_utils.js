const Utils = artifacts.require('./Utils.sol');
const CrowdFunding = artifacts.require('./CrowdFundingWithDeadline.sol');
const TestCrowdFunding = artifacts.require(
  './TestCrowdFundingWithDeadline.sol'
);

module.exports = function(deployer) {
  deployer.deploy(Utils);
  deployer.link(Utils, CrowdFunding);
  deployer.link(Utils, TestCrowdFunding);
};
