import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function createEmployee(
  employee: EmployeesRecord | EmployeesResponse
) {
  const data = new FormData();
  data.append("password", NewUserDefaultPassword);
  data.append("passwordConfirm", NewUserDefaultPassword);
  data.append("verified", "");
  data.append("emailVisibility", "1");

  for (let key of Object.keys(employee)) {
    if (key == "allowances" || key == "deductions") continue;
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (!(employee.avatar instanceof File)) {
        continue;
      }
    }
    data.append(key, employee[key] || "");
  }

  for (let allowance of employee.allowances || []) {
    data.append("allowances", allowance);
  }

  for (let deduction of employee.deductions || []) {
    data.append("deductions", deduction);
  }

  data.set(
    "birth_date",
    employee.birth_date ? new Date(employee.birth_date || "").toISOString() : ""
  );
  data.set(
    "starting_date",
    employee.starting_date
      ? new Date(employee.starting_date || "").toISOString()
      : ""
  );
  data.set("phone_numbers", JSON.stringify(employee.phone_numbers));

  const record = await pb.collection("employees").create(data);
  await pb.collection("employees").requestVerification(record.email);

  return record;
}
