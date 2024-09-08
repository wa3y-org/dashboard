const pb = usePocketBase();
export async function getAllEmployees() {
  return await pb.collection("employees").getFullList({
    sort: "-created",
    expand: "allowances, deductions",
  });
}
