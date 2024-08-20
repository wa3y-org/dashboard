export const noDateValue = new Date("01/01/1970 00:00");
export type ModelJson = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export abstract class Model {
  public readonly id: string = "";
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(model: ModelJson = {}) {
    this.id = model.id || "";
    this.createdAt = model.createdAt || noDateValue;
    this.updatedAt = model.updatedAt || noDateValue;
  }
}
