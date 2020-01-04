class ClaimType {
  private description: string;

  constructor(desc: string) {
    this.description = desc;
  }

  public static TotalLoss(): ClaimType {
    return new ClaimType('TOTAL LOSS');
  }

  public getDescription(): string {
    return this.description;
  }

  public getString(): string {
    return this.description;
  }
}

export default ClaimType;
