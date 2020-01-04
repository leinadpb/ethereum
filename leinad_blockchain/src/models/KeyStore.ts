import DigitalSignature from './DigitalSignature';

class KeyStore {
  private authenticatedHashKey: string;
  private digitalSignature: DigitalSignature;

  constructor(authKey: string) {
    this.authenticatedHashKey = authKey;
    this.digitalSignature = new DigitalSignature();
    this.digitalSignature.assignNewKey();
  }

  public signBlock(blockHash: string): string {
    console.log(' >> Trying to sign block with hash: ', blockHash);
    // Use (or import) private key
    let privateKey: string | undefined = this.digitalSignature.getPrivateKey();
    if (privateKey !== undefined) {
      return DigitalSignature.SignData(blockHash, privateKey);
    } else {
      throw new Error('Private Key has not been generated or imported!');
    }
  }

  public verifyBlock(blockHash: string, signature: string): boolean {
    // Use (or import) public key
    let publicKey: string | undefined = this.digitalSignature.getPublicKey();
    if (publicKey !== undefined) {
      return DigitalSignature.VerifySignature(blockHash, signature, publicKey);
    } else {
      throw new Error('Public Key has not been generated or imported!');
    }
  }

  public getAuthenticatedHashKey(): string {
    return this.authenticatedHashKey;
  }
  public setAuthenticatedHashKey(value: string) {
    this.authenticatedHashKey = value;
  }
}

export default KeyStore;
