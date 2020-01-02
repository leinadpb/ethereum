module.exports = {
  networks: {
    ganache: {
      host: 'localhost', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*' // Any network (default: none)
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.4.25', // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'byzantium'
      }
    }
  }
};
