import type { VolunteersRecord, VolunteersResponse } from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getAllVolunteers() {
  return await pb.collection("volunteers").getFullList({
    sort: "-created",
  });
}

export async function getOneVolunteer(id: string) {
  const record: VolunteersRecord = await pb.collection("volunteers").getOne(id);

  console.log(record);

  return record;
}
