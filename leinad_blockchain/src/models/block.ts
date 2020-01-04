import ClaimType from './claim_type';
import CryptoJS from 'crypto-js';

class Block {
  // Transaction details
  private claimNumber: string;
  private settlementAmount: number;
  private settlementDate: Date;
  private carRegistration: string;
  private mileage: number;
  private claimType: ClaimType;

  // Block details
  private blockNumber: number;
  private createdDate: Date;
  private blockHash?: string;
  private previousBlockHash?: string;
  private nextBlock?: Block;

  // internals
  private parent?: Block;

  constructor(
    blockNumber: number,
    claimNumber: string,
    settlementAmount: number,
    settlementDate: Date,
    carRegistration: string,
    mileage: number,
    claimType: ClaimType,
    parent: Block | undefined
  ) {
    this.blockNumber = blockNumber;
    this.claimNumber = claimNumber;
    this.settlementAmount = settlementAmount;
    this.settlementDate = settlementDate;
    this.carRegistration = carRegistration;
    this.mileage = mileage;
    this.claimType = claimType;
    this.createdDate = new Date();
    this.parent = parent;
  }

  // Instance methods
  public async initializeBlock() {
    await this.setCurrentBlockHash(this.parent);
  }
  public async calculateBlockHash(prevBlockHash: string | undefined): Promise<string> {
    let txHash: string =
      this.claimNumber + this.settlementAmount.toString() + this.settlementDate.toUTCString() + this.carRegistration + this.mileage.toString() + this.claimType.getString();
    let blockHeader: string = this.blockNumber.toString() + this.createdDate.toUTCString() + (prevBlockHash !== undefined ? prevBlockHash : '');
    let combined: string = txHash + blockHeader;

    // Hash combined value and return it as base64 string
    let digest = await CryptoJS.SHA256(combined);

    // console.log('To calculate hash ------->');
    // console.log('     claimNumber: ', this.claimNumber);
    // console.log('     settlementAmount: ', this.settlementAmount.toString());
    // console.log('     settlementDate: ', this.settlementDate.toUTCString());
    // console.log('     carRegistration: ', this.carRegistration);
    // console.log('     mileage: ', this.mileage.toString());
    // console.log('     claimType: ', this.claimType.getString());
    // console.log('     blockNumber: ', this.blockNumber.toString());
    // console.log('     createdDate: ', this.createdDate.toUTCString());
    // console.log('     previousBlockHash: ', this.previousBlockHash);
    // console.log(combined);
    // console.log(digest);
    // console.log(digest.toString());
    // console.log('---- END Hash calculation ------');
    return digest.toString();
  }

  public async setCurrentBlockHash(parent: Block | undefined) {
    if (parent !== undefined) {
      // console.log('ALGO: ', parent);
      this.previousBlockHash = parent.getBlockHash();
      parent.setNextBlock(this);
    } else {
      // Previous block is the Genesis block
      this.previousBlockHash = undefined;
    }
    let hash: string = await this.calculateBlockHash(this.previousBlockHash);
    // console.log('CALCULATE BLOCK HASH: ', hash);
    this.blockHash = hash;
  }

  public async isValidChain(prevBlockHash: string | undefined, verbose: boolean): Promise<boolean> {
    let isValid: boolean = true;

    // Is this a valid block and transaction
    let newBlockHash: string = await this.calculateBlockHash(prevBlockHash);
    // console.log('------');
    // console.log('PASSED PREV HASH ON ISVALID: ', prevBlockHash);
    // console.log('BLOCK PREV HASH ON ISVALID: ', this.previousBlockHash);
    // console.log('NEW HASH ON ISVALID: ', newBlockHash);
    // console.log('CURRENT HASH ON ISVALID: ', this.getBlockHash());
    if (newBlockHash !== this.getBlockHash()) {
      isValid = false;
    } else {
      // Does the previous block hash match the latest previous block hash
      isValid = this.previousBlockHash === prevBlockHash;
    }

    this.printVerificationMessage(verbose, isValid);
    // console.log('------');

    // Check the next block by passing in our newly calculated blockhash. This will be compared to
    // hash in the next block. They should match for the chain to be valid.
    if (this.nextBlock !== undefined) {
      return this.nextBlock.isValidChain(newBlockHash, verbose);
    }

    return isValid;
  }

  private printVerificationMessage(verbose: boolean, isValid: boolean) {
    if (verbose) {
      if (isValid) {
        console.log('Block Number ', this.blockNumber, ' : PASS VERIFICATION');
      } else {
        console.log('Block Number ', this.blockNumber, ' : FAILED VERIFICATION');
      }
    }
  }

  /**
   * Getters and setter
   *
   **/

  public getClaimNumber(): string | undefined {
    return this.claimNumber;
  }
  public setClaimNumber(value: string) {
    this.claimNumber = value;
  }
  public getSettlementAmount(): number | undefined {
    return this.settlementAmount;
  }
  public setSettlementAmount(value: number) {
    this.settlementAmount = value;
  }
  public getSettlementDate(): Date | undefined {
    return this.settlementDate;
  }
  public setSettlementDate(value: Date) {
    this.settlementDate = value;
  }
  public getCarRegistration(): string | undefined {
    return this.carRegistration;
  }
  public setCarRegistration(value: string) {
    this.carRegistration = value;
  }
  public getMileage(): number | undefined {
    return this.mileage;
  }
  public setMileage(value: number) {
    this.mileage = value;
  }
  public getClaimType(): ClaimType | undefined {
    return this.claimType;
  }
  public setClaimType(value: ClaimType) {
    this.claimType = value;
  }
  public getBlockNumber(): number | undefined {
    return this.blockNumber;
  }
  public setBlockNumber(value: number) {
    this.blockNumber = value;
  }
  public getCreatedDate(): Date | undefined {
    return this.createdDate;
  }
  public setCreatedDate(value: Date) {
    this.createdDate = value;
  }
  public getBlockHash(): string | undefined {
    return this.blockHash;
  }
  public setBlockHash(value: string) {
    this.blockHash = value;
  }
  public getPreviousBlockHash(): string | undefined {
    return this.previousBlockHash;
  }
  public setPreviousBlockHash(value: string | undefined) {
    this.previousBlockHash = value;
  }
  public getNextBlock(): Block | undefined {
    return this.nextBlock;
  }
  public setNextBlock(value: Block) {
    this.nextBlock = value;
  }
}

export default Block;
