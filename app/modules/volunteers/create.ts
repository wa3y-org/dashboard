import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type VolunteersRecord,
  type VolunteersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import { backendRequestOne } from "~/app/core/BackendRequest";

const pb = usePocketBase();

export async function createVolunteer(
  volunteer: VolunteersRecord & VolunteersResponse
) {
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
    volunteer.birth_date
      ? new Date(volunteer.birth_date || "").toISOString()
      : ""
  );
  data.set(
    "starting_date",
    volunteer.starting_date
      ? new Date(volunteer.starting_date || "").toISOString()
      : ""
  );
  data.set("phone_numbers", JSON.stringify(volunteer.phone_numbers));

  const response = await backendRequestOne<VolunteersRecord>(async () => {
    return await pb.collection("volunteers").create(data);
  });

  if (response.model && !response.error) {
    pb.collection("volunteers").requestVerification(response.model.email);
    const action = UserActivitiesActionOptions.CREATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.volunteers,
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
