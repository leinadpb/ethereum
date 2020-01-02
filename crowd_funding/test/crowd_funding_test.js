let CrowdFundingWithDeadline = artifacts.require(
  './TestCrowdFundingWithDeadline'
);

contract('CrowdFundingWithDeadline Tests', accounts => {
  let contract;
  let contractCreator = accounts[0];
  let beneficiary = accounts[1];

  const ONE_ETH = 1000000000000000000; // Required amount in weis for contract
  const FUND_NAME = 'Funding LEINAD'; // Campaing name
  const ONGOING_STATE = 0;
  const FAILED_STATE = 1;
  const SUCCEEDED_STATE = 2;
  const PAIDOUT_STATE = 3;

  beforeEach(async () => {
    contract = await CrowdFundingWithDeadline.new(
      FUND_NAME,
      1,
      10,
      beneficiary,
      {
        from: contractCreator,
        gas: 2000000
      }
    );
  });

  it('contract is initialized', async () => {
    let campaingName = await contract.name.call();
    expect(campaingName).to.equal(FUND_NAME);

    let targetAmount = await contract.targetAmount.call();
    expect(Number(targetAmount)).to.equal(ONE_ETH);

    let fundingDeadline = await contract.fundingDeadline.call();
    expect(Number(fundingDeadline)).to.equal(600);

    let actualBeneficiary = await contract.beneficiary.call();
    expect(actualBeneficiary).to.equal(beneficiary);

    let state = await contract.state.call();
    expect(Number(state.valueOf())).to.equal(ONGOING_STATE);
  });

  it('funds are contributed', async () => {
    await contract.contribute({
      from: contractCreator,
      value: ONE_ETH
    });

    console.info('Verify contribution');
    let contributed = await contract.amounts.call(contractCreator);
    expect(Number(contributed)).to.equal(ONE_ETH);

    console.info('Verify total collected');
    let totalCollected = await contract.totalCollected.call();
    expect(Number(totalCollected)).to.equal(ONE_ETH);
  });

  it('cannot make contributions after deadline', async () => {
    let ERR_MSG = 'VM Exception while processing transaction: revert';
    try {
      await contract.setTime(601);
      await contract.sendTransaction({
        value: ONE_ETH,
        from: contractCreator
      });
      expect.fail();
    } catch (e) {
      expect(e.message).to.include(ERR_MSG);
    }
  });
});
