import type { MembersRecord, MembersResponse } from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getAllMembers() {
  return await pb.collection("members").getFullList({
    sort: "-created",
  });
}

export async function getOneMember(id: string) {
  const record: MembersRecord = await pb.collection("members").getOne(id);

  console.log(record);

  return record;
}
