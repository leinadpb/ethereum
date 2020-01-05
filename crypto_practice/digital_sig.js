const crypto = require('crypto');
const keyGen = require('./generate_pub_priv_key');
const randIdentifier = require('./crypto_rand_id');

const RSA_ALGORITHM = 'RSA-SHA256';
const DATA_TO_SIGN = randIdentifier.generateNumberId(12, true);

const keyStore = keyGen.generate();
const public_key = keyStore.publicKey;
const private_key = keyStore.privateKey;

//File to be signed
const packageSecretCode = DATA_TO_SIGN;
//Signing
const signer = crypto.createSign(RSA_ALGORITHM);
signer.write(packageSecretCode);
signer.end();
const digitalSignature = signer.sign(private_key);

console.log('Digital Signature: ' + Buffer.from(digitalSignature).toString('base64'));

console.log('\n--------- Start Digital Signature Verification Process ----------');
const verifier = crypto.createVerify(RSA_ALGORITHM);
verifier.write(packageSecretCode);
verifier.end();
let verifyResult = verifier.verify(public_key, digitalSignature);
console.log('Digital Signature Verification result: ', verifyResult);
console.log('\n');
