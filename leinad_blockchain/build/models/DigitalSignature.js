"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class DigitalSignature {
    assignNewKey() {
        const { publicKey, privateKey } = crypto_1.generateKeyPairSync('rsa', {
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
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    static SignData(data, privateKey) {
        // Signing
        const signer = crypto_1.createSign('RSA-SHA256');
        signer.write(data);
        signer.end();
        console.log('SIGN DATA :: DigitalSignature :: signer', signer);
        console.log('SIGN DATA :: DigitalSignature :: privateKey', privateKey);
        // Returns the signature in output_format which can be 'binary', 'hex' or 'base64'
        const signature = signer.sign(privateKey, 'base64');
        return signature;
    }
    static VerifySignature(data, signature, publicKey) {
        const verify = crypto_1.createVerify('sha256');
        verify.write(data);
        verify.end();
        return verify.verify(publicKey, signature);
    }
    getPublicKey() {
        return this.publicKey;
    }
    getPrivateKey() {
        return this.privateKey;
    }
}
exports.default = DigitalSignature;
