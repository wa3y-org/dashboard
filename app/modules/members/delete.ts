export async function deleteMember(id: string) {
  return await usePocketBase().collection("members").delete(id);
}
