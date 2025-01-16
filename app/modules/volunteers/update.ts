import {
  UserActivitiesActionOptions,
  UserActivitiesCategoriesOptions,
  type VolunteersRecord,
  type VolunteersResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import { backendRequestOne } from "~/app/core/BackendRequest";

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

  const volunteerData = await pb.collection("volunteers").getOne(volunteer.id);
  const response = await backendRequestOne<VolunteersRecord>(async () => {
    return await pb.collection("volunteers").update(volunteer.id, data);
  });

  if (response.model && !response.error) {
    const action = UserActivitiesActionOptions.UPDATE;
    const categories: UserActivitiesCategoriesOptions[] = [
      UserActivitiesCategoriesOptions.volunteers,
      UserActivitiesCategoriesOptions.hr,
    ];
    const obj_before = volunteerData;
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
