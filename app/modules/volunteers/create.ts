import type { VolunteersRecord, VolunteersResponse } from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function createVolunteer(volunteer: VolunteersRecord & VolunteersResponse) {
  const data = new FormData();
  data.append("password", NewUserDefaultPassword);
  data.append("passwordConfirm", NewUserDefaultPassword);
  data.append("verified", "");
  data.append("emailVisibility", "1");

  for (let key of Object.keys(volunteer)) {
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (volunteer.avatar && !(volunteer.avatar instanceof File)) {
        continue;
      }
    }
    data.append(key, volunteer[key] || "");
  }

  data.set(
    "birth_date",
    volunteer.birth_date ? new Date(volunteer.birth_date || "").toISOString() : ""
  );
  data.set(
    "starting_date",
    volunteer.starting_date
      ? new Date(volunteer.starting_date || "").toISOString()
      : ""
  );
  data.set("phone_numbers", JSON.stringify(volunteer.phone_numbers));

  const record = await pb.collection("volunteers").create(data);
  await pb.collection("volunteers").requestVerification(record.email);

  return record;
}
