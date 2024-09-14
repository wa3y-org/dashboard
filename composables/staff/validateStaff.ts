import v8n from "v8n";
import { type StaffPerson, type TStaff } from ".";

const validTypes = ["employee", "member"];
const validCollections = ["employees", "members"];

function validatePosition(position: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(position.trim())) {
    errors.push("Invalid position, min length must be 3 characters");
  }
  return errors;
}

function validateType(type: string) {
  const errors: string[] = [];
  if (!validTypes.includes(type)) {
    errors.push("Invalid Type: select ", validTypes.join(","));
  }
  return errors;
}

function validatePerson(person: StaffPerson) {
  const errors: string[] = [];
  if (
    !person ||
    !person.id ||
    !validCollections.includes(person.collectionName)
  ) {
    errors.push("Invalid Person");
  }
  return errors;
}

export function validateStaff(staff: TStaff) {
  const errors: { [key: string]: string[] } = {
    position: validatePosition(staff.position),
    description: [],
    type: validateType(staff.type || ""),
    person: validatePerson(staff.person),
  };

  return errors;
}
