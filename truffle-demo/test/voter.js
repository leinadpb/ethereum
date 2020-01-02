let Voter = artifacts.require('./Voter.sol');

contract('Voter', accounts => {
  let voter;
  let firstAccount;

  beforeEach(async () => {
    firstAccount = accounts[0];
    voter = await Voter.new();
    await setOptions(firstAccount, ['coffee', 'tea']);
  });

  it('has no votes by default', async () => {
    let votes = await voter.getVotes.call();

    expect(toNumbers(votes)).to.deep.equal([0, 0]);
  });

  it('can vote with a string option', async () => {
    // console.log(voter.vote);
    await voter.vote('coffee', {
      from: firstAccount
    });
    let votes = await voter.getVotes.call();

    expect(toNumbers(votes)).to.deep.equal([1, 0]);
  });

  it('can vote with a number option', async () => {
    // console.log(voter.vote);
    await voter.methods['vote(uint256)'](0, {
      from: firstAccount
    });
    let votes = await voter.getVotes.call();

    expect(toNumbers(votes)).to.deep.equal([1, 0]);
  });

  const ERROR_MSG = 'Account has already voted!!!';

  it('cannot vote twice from the same contract', async () => {
    try {
      await voter.methods['vote(uint256)'](0, {
        from: firstAccount
      });
      await voter.methods['vote(uint256)'](0, {
        from: firstAccount
      });
      expect.fail();
    } catch (error) {
      expect(error.message).to.include(ERROR_MSG);
    }
  });

  async function setOptions(account, options) {
    for (pos in options) {
      await voter.addOption(options[pos], { from: account });
    }
    await voter.startVoting({ from: account, gas: 6000000 });
  }

  function toNumbers(bigNumbers) {
    return bigNumbers.map(bigNumber => {
      return bigNumber.toNumber();
    });
  }
});
