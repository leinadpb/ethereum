import CryptoJS from 'crypto-js';

class Hashing {
  public static async ComputeHashSHA256(data: string): Promise<string> {
    let digest = await CryptoJS.SHA256(data);

    return digest.toString();
  }
}

export default Hashing;
