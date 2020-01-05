import { generateKeyPairSync, createSign, createVerify } from 'crypto';

class DigitalSignature {
  private publicKey?: string;
  private privateKey?: string;

  public assignNewKey() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
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

  public static SignData(data: string, privateKey: string): string {
    // Signing
    const signer = createSign('RSA-SHA256');
    signer.write(data);
    signer.end();

    // console.log('SIGN DATA :: DigitalSignature :: signer', signer);
    // console.log('SIGN DATA :: DigitalSignature :: privateKey', privateKey);

    // Returns the signature in output_format which can be 'binary', 'hex' or 'base64'
    const signature = signer.sign(privateKey, 'base64');

    return signature;
  }
  public static VerifySignature(data: string, signature: string, publicKey: string): boolean {
    const verify = createVerify('sha256');
    verify.write(data);
    verify.end();

    return verify.verify(publicKey, signature);
  }

  public getPublicKey(): string | undefined {
    return this.publicKey;
  }
  public getPrivateKey(): string | undefined {
    return this.privateKey;
  }
}

export default DigitalSignature;
