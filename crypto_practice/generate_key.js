const crypto = require('crypto');

const generateKey = () => {
  // just a secure random key
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateKey());
