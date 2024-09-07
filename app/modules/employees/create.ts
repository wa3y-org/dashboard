import type { EmployeesRecord } from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function createEmployee(employee: EmployeesRecord) {
  const data = new FormData();
  data.append("password", NewUserDefaultPassword);
  data.append("passwordConfirm", NewUserDefaultPassword);
  for (let key of Object.keys(employee)) {
    data.append(key, employee[key]);
  }

  data.set("birth_date", new Date(employee.birth_date).toISOString());
  data.set("starting_date", new Date(employee.birth_date).toISOString());
  data.set("phone_numbers", JSON.stringify(employee.phone_numbers));

  const record = await pb.collection("employees").create(data);
  await pb.collection("employees").requestVerification(record.email);
}
