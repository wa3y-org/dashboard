import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type MembersRecord,
  type MembersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import { backendRequestOne } from "~/app/core/BackendRequest";

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

  // const record = await pb.collection("members").create(data);

  const response = await backendRequestOne<MembersRecord>(async () => {
    const response = await pb.collection("members").create(data);
    return response;
  });

  if (response.model && !response.error) {
    pb.collection("members").requestVerification(response.model.email);
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.members,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = null;
    const obj_after = response.model;
    const comment = null;

    useActivityMonitor().create(
      action,
      categories,
      obj_before,
      obj_after,
      comment
    );
  }

  return response.model;
}
