import type {
  MembersRecord,
  MembersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function updateMember(
  member: MembersRecord | MembersResponse
) {
  const data = new FormData();

  for (let key of Object.keys(member)) {
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (!(member.avatar instanceof File)) {
        continue;
      }
    }
    data.append(key, member[key] || "");
  }

 
  data.set(
    "birth_date",
    member.birth_date ? new Date(member.birth_date || "").toISOString() : ""
  );
  data.set(
    "starting_date",
    member.starting_date
      ? new Date(member.starting_date || "").toISOString()
      : ""
  );
  data.set("phone_numbers", JSON.stringify(member.phone_numbers));

  const record = await pb.collection("members").update(member.id, data);

  return record;
}
