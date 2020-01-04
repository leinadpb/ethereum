"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DigitalSignature_1 = __importDefault(require("./DigitalSignature"));
class KeyStore {
    constructor(authKey) {
        this.authenticatedHashKey = authKey;
        this.digitalSignature = new DigitalSignature_1.default();
        this.digitalSignature.assignNewKey();
    }
    signBlock(blockHash) {
        console.log(' >> Trying to sign block with hash: ', blockHash);
        // Use (or import) private key
        let privateKey = this.digitalSignature.getPrivateKey();
        if (privateKey !== undefined) {
            return DigitalSignature_1.default.SignData(blockHash, privateKey);
        }
        else {
            throw new Error('Private Key has not been generated or imported!');
        }
    }
    verifyBlock(blockHash, signature) {
        // Use (or import) public key
        let publicKey = this.digitalSignature.getPublicKey();
        if (publicKey !== undefined) {
            return DigitalSignature_1.default.VerifySignature(blockHash, signature, publicKey);
        }
        else {
            throw new Error('Public Key has not been generated or imported!');
        }
    }
    getAuthenticatedHashKey() {
        return this.authenticatedHashKey;
    }
    setAuthenticatedHashKey(value) {
        this.authenticatedHashKey = value;
    }
}
exports.default = KeyStore;
