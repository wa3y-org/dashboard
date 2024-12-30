import type {
  EmployeesRecord,
  EmployeesResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import { employeeConfig } from ".";
import { backendRequestOne } from "~/app/core/BackendRequest";

const pb = usePocketBase();

export async function updateEmployee(
  employee: EmployeesRecord | EmployeesResponse
) {
  const data = new FormData();

  const keysToPass = ["allowances", "deductions", "roles", "project"];

  if (!employee.oldPassword) {
    keysToPass.push("password", "passwordConfirm", "oldPassword")
  }
  for (let key of Object.keys(employee)) {
    if (keysToPass.includes(key)) continue;
    if (key.trim().toLocaleLowerCase() == "avatar") {
      if (!(employee.avatar instanceof File)) {
        continue;
      }
    }
    data.append(key, employee[key] || "");
  }

  if (employee.project?.id ) {
    data.set('project', employee.project.id);
  }else {
    data.set('project', employee.project || '')
  }

  for (let allowance of employee.allowances || [""]) {
    data.append("allowances", allowance);
  }

  for (let deduction of employee.deductions || [""]) {
    data.append("deductions", deduction);
  }

  for (let role of employee.roles || [""]) {
    data.append("roles", role);
  }

  if (!data.has("allowances")) {
    data.append("allowances", []);
  }

  if (!data.has("deductions")) {
    data.append("deductions", []);
  }

  if (!data.has("roles")) {
    data.append("roles", []);
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

 
  return await backendRequestOne<EmployeesRecord>(async () => {
    return await pb.collection("employees").update(employee.id, data);
  });
}
