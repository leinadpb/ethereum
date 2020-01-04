import crypto from 'crypto';

class Hmac {
  public static ComputeHmacSHA256(data: string, authKey: string): string {
    return crypto
      .createHmac('sha256', authKey)
      .update(data)
      .digest('hex');
  }
  public static GenerateKey(): string {
    // just a secure random key
    return crypto.randomBytes(64).toString('hex');
  }
}

export default Hmac;
