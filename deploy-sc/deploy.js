let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');
let path = require('path');

function compileContract() {
  const voterPath = path.resolve(__dirname, 'contracts', 'Voter.sol');
  const source = fs.readFileSync(voterPath, 'UTF-8');

  console.log(`Source: ${source}`);

  var compilerInput = {
    Voter: source
  };

  console.log('Compiling the contract: ', compilerInput);
  // Compile and optimize the contract
  let compiledContract = solc.compile({ sources: compilerInput }, 1);
  // Get compiled contract
  // let compiledContract = JSON.parse(solc.compile(compilerInput, 1));

  let contract = compiledContract.contracts['Voter:Voter'];

  //Save contracts' ABI
  let abi = contract.interface;
  fs.writeFileSync('abi.json', abi);

  console.log(`ABI: ${abi}`);

  return contract;
}

function createWeb3() {
  let web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  return web3;
}

async function deployContract(web3, contract, sender) {
  let Voter = new web3.eth.Contract(JSON.parse(contract.interface));
  let bytecode = '0x' + contract.bytecode;
  let gasEstimate = await web3.eth.estimateGas({ data: bytecode });

  console.log('Deploying the contract');
  const contractInstance = await Voter.deploy({
    data: bytecode
  })
    .send({
      from: sender,
      gas: gasEstimate
    })
    .on('transactionHash', txHash => {
      console.log(`Transaction hash: ${txHash}`);
    })
    .on('confirmation', (confNumber, receipt) => {
      console.log(`Confirmation number: ${confNumber}`);
    });

  console.log(`Contract address: ${contractInstance.options.address}`);
}

let contract = compileContract();
let web3 = createWeb3();
let sender = '0x064214ea081ecf9a92a1258898b1f4d0d966534f';

deployContract(web3, contract, sender)
  .then(() => {
    console.log('Deployment finished.');
  })
  .catch(error => {
    console.log(`Failed to deploy contract: ${error}`);
  });

// Start Geth client:  geth --rinkeby --rpc --rpcapi="eth,net,web3,personal,txpool" --syncmode=light
