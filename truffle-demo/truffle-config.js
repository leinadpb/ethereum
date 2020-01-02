module.exports = {
  networks: {
    genache: {
      host: 'localhost',
      port: 7545,
      gas: 5000000,
      network_id: '*' // Match any network id
    }
  },
  compilers: {
    solc: {
      version: '0.4.25',
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'byzantium'
      }
    }
  }
};
