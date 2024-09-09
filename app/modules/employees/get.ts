import type { EmployeesRecord, EmployeesResponse } from "~/app/pocketbase-types";

const pb = usePocketBase();

export async function getAllEmployees() {
  return await pb.collection("employees").getFullList({
    sort: "-created",
    expand: "allowances, deductions",
  });
}

export async function getOneEmployee(id: string) {
  const record : EmployeesRecord = await pb.collection("employees").getOne(id, {
    expand: "allowances, deductions",
  });

  console.log(record)
  
  return record;
}
