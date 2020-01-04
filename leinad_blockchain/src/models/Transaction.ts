import ClaimType from './claim_type';
import Hashing from '../helpers/Hashing';

class Transaction {
  private claimNumber: string;
  private settlementAmount: number;
  private settlementDate: Date;
  private carRegistration: string;
  private mileage: number;
  private claimType: ClaimType;

  constructor(claimNumber: string, settlementAmount: number, settlementDate: Date, carRegistration: string, mileage: number, claimType: ClaimType) {
    this.claimNumber = claimNumber;
    this.settlementAmount = settlementAmount;
    this.settlementDate = settlementDate;
    this.carRegistration = carRegistration;
    this.mileage = mileage;
    this.claimType = claimType;
  }

  public async calculateTransactionHash(): Promise<string> {
    let transData: string = this.claimNumber + this.settlementAmount + this.settlementDate.toUTCString() + this.carRegistration + this.mileage + this.claimType.getString();

    return await Hashing.ComputeHashSHA256(transData);
  }

  /**
   * Getters and setter
   */
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
}

export default Transaction;
