let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');
let path = require('path');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let contractAddress = '0x6f11D2F69b9806284A8e11e2A554b4Dd63c0C535';
let fromAddress = '0x064214ea081ecf9a92a1258898b1f4d0d966534f';

let ABIPath = path.resolve(__dirname, 'abi.json');
let abiStr = fs.readFileSync(ABIPath, 'UTF-8');
let abi = JSON.parse(abiStr);

let voter = new web3.eth.Contract(abi, contractAddress);

sendTransactions()
  .then(() => {
    console.log('Done!');
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });

async function sendTransactions() {
  console.log('Adding option coffee');
  await voter.methods.addOption('coffee').send({ from: fromAddress });

  console.log('Adding option tea');
  await voter.methods.addOption('tea').send({ from: fromAddress });

  console.log('Stating voting...');
  await voter.methods.startVoting().send({ from: fromAddress, gas: 600000 });

  console.log('Voting');
  await voter.methods['vote(uint256)'](0).send({
    from: fromAddress,
    gas: 600000
  });

  console.log('Getting votes');
  let votes = await voter.methods.getVotes().call({ from: fromAddress });

  console.log(`Votes: ${votes}`);
}
