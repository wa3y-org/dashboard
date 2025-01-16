import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type MembersRecord,
  type MembersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import { backendRequestOne } from "~/app/core/BackendRequest";

const pb = usePocketBase();

export async function updateMember(member: MembersRecord | MembersResponse) {
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

  const memberData = await pb.collection("members").getOne(member.id);
  const response = await backendRequestOne<MembersRecord>(async () => {
    return await pb.collection("members").update(member.id, data);
  });
  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.members,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = memberData;
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
