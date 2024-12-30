import type {
  EmployeesRecord,
  EmployeesResponse,
  RolesResponse,
} from "~/app/pocketbase-types";
import { NewUserDefaultPassword } from "../users/domain/models/User";
import type { AuthModel, BaseModel } from "pocketbase";
import { backendRequestOne } from "~/app/core/BackendRequest";

const pb = usePocketBase();

export async function createEmployee(
  employee: EmployeesRecord & EmployeesResponse & BaseModel & AuthModel
) {
  const data = new FormData();
  data.append("emailVisibility", "1");
  // data.append("verified", "1");

  for (let key of Object.keys(employee)) {
    if (key == "allowances" || key == "deductions" || key == "roles" || key == "project") continue;
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


  for (let role of employee.roles || []) {
    data.append("roles", role);
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

  return await backendRequestOne<EmployeesRecord>(async () => {
    const response = await pb.collection("employees").create(data);
    await pb.collection("employees").requestVerification(response.email);
    return response;
  });
}
