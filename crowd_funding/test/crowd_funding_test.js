let CrowdFundingWithDeadline = artifacts.require(
  './TestCrowdFundingWithDeadline'
);

contract('CrowdFundingWithDeadline Tests', accounts => {
  let contract;
  let contractCreator = accounts[1];
  let beneficiary = accounts[2];

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

  afterEach(async () => {
    await contract.kill({ from: contractCreator });
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

  it('Crowdfunding succeeded', async () => {
    await contract.contribute({
      value: ONE_ETH,
      from: contractCreator
    });
    await contract.setTime(601);
    await contract.finishCrowdFunding();
    let state = await contract.state.call();

    expect(Number(state.valueOf())).to.equal(SUCCEEDED_STATE);
  });

  it('Crowdfunding failed', async () => {
    await contract.contribute({
      value: ONE_ETH / 2,
      from: contractCreator
    });
    await contract.setTime(601);
    await contract.finishCrowdFunding();
    let state = await contract.state.call();

    expect(Number(state.valueOf())).to.equal(FAILED_STATE);
  });

  it('collect money and paid out', async () => {
    await contract.contribute({
      value: ONE_ETH,
      from: contractCreator
    });
    await contract.setTime(601);
    await contract.finishCrowdFunding();

    let initAmount = await web3.eth.getBalance(beneficiary);
    await contract.collect({ from: contractCreator });

    let newBalance = await web3.eth.getBalance(beneficiary);

    // Beneficiary amount should be incremented in network by ONE_ETH
    expect(newBalance - initAmount).to.equal(ONE_ETH);

    let fundingState = await contract.state.call();
    // Contract's state must be PAID_OUT
    expect(Number(fundingState.valueOf())).to.equal(PAIDOUT_STATE);
  });

  it('withdraw funds from the contract', async () => {
    await contract.contribute({
      value: ONE_ETH - 100,
      from: contractCreator
    });
    await contract.setTime(601);
    await contract.finishCrowdFunding();

    await contract.withdraw({ from: contractCreator });
    let conAmountAfterWithdraw = await contract.amounts.call(contractCreator);

    // amount of sender must be in zero
    expect(Number(conAmountAfterWithdraw)).to.equals(0);
  });

  it('event emitted on campaign finishing', async () => {
    const options = { fromBlock: 0, toBlock: 'latest' };

    await contract.setTime(601);
    await contract.finishCrowdFunding(); // This functions emits an event  " CampaignFinished "

    const allEvents = await contract.getPastEvents('CampaignFinished', options);
    const finishedEvent = allEvents.find(e => e.event === 'CampaignFinished');

    expect(Number(finishedEvent.args.totalCollected)).to.equal(0);
    expect(finishedEvent.args.succeeded).to.equal(false);
  });
});
