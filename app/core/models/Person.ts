import { Model } from "./Model";
import { PersonID } from "./PersonID";

enum PersonSex {
  Male = "Male",
  Female = "Female",
}

export class PersonModel extends Model {
  public name: string;
  public sex?: PersonSex;
  public birth_date?: Date;
  public avatar_image?: string;
  public _identification?: PersonID;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
