export enum IDType {
  Passport = "Passport",
  NationalNumber = "National_No",
}

export class PersonID {
  public type: IDType;
  public nationality: string;
  public expiryData: Date;
  public issuePlace: string;
  public idNumber: string;
  public fileUrl: string;
  public fileMime: string;
}
