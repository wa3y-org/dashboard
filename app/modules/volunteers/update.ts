import type {
  VolunteersRecord,
  VolunteersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function updateVolunteer(
  volunteer: VolunteersRecord & VolunteersResponse
) {
  const data = new FormData();

  for (let key of Object.keys(volunteer)) {
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (!(volunteer.avatar instanceof File)) {
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

  const record = await pb.collection("volunteers").update(volunteer.id, data);

  return record;
}
