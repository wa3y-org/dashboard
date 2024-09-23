export async function deleteVolunteer(id: string) {
  return await usePocketBase().collection("volunteers").delete(id);
}
