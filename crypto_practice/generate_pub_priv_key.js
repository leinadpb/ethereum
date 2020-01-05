const crypto = require('crypto');

const generate = verbose => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: ''
    }
  });
  if (verbose) {
    console.log('Public key: ', publicKey);
    console.log('Private key: ', privateKey);
  }
  return {
    publicKey: publicKey,
    privateKey: privateKey
  };
};

module.exports = {
  generate
};
