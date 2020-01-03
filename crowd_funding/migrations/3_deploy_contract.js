const CrowdFunding = artifacts.require('./CrowdFundingWithDeadline.sol');

module.exports = function(deployer) {
  deployer.deploy(
    CrowdFunding,
    'Test DANIEL Campaing',
    1,
    200,
    '0xB92BEA0c41Eaaf15DC589DFcE7fCFc253628dCfF'
  );
};
