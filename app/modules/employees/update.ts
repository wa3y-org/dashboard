import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";

const pb = usePocketBase();

export async function updateEmployee(
  employee: EmployeesRecord | EmployeesResponse
) {
  const data = new FormData();

  for (let key of Object.keys(employee)) {
    if (key == "allowances" || key == "deductions") continue;
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (!(employee.avatar instanceof File)) {
        continue;
      }
    }
    data.append(key, employee[key] || "");
  }

 

  for (let allowance of employee.allowances || ['']) {
    data.append("allowances", allowance);
  }

  for (let deduction of employee.deductions || ['']) {
    data.append("deductions", deduction);
  }

  if (!data.has('allowances')) {
    data.append('allowances', []);
  }

  if (!data.has('deductions')) {
    data.append('deductions', []);
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

  const record = await pb.collection("employees").update(employee.id, data);

  return record;
}
