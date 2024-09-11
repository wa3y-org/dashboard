import type { MembersRecord, MembersResponse } from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function createMember(member: MembersRecord | MembersResponse) {
  const data = new FormData();
  data.append("password", NewUserDefaultPassword);
  data.append("passwordConfirm", NewUserDefaultPassword);
  data.append("verified", "");
  data.append("emailVisibility", "1");

  for (let key of Object.keys(member)) {
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (member.avatar && !(member.avatar instanceof File)) {
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

  const record = await pb.collection("members").create(data);
  await pb.collection("members").requestVerification(record.email);

  return record;
}
