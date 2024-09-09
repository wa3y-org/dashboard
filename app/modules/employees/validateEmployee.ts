import v8n from "v8n";
import type { EmployeesRecord } from "~/app/pocketbase-types";

function validateName(name: string): string[] {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(name.trim())) {
    errors.push("Invalid name, min length must be 3 characters");
  }
  return errors;
}

function validateEmail(email: string) {
  const errors: string[] = [];
  if (
    !v8n()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .test(email.trim())
  ) {
    errors.push("Invalid email");
  }
  return errors;
}

function validateEmploymentSection(section: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(1).test(section.trim())) {
    errors.push("Invalid section");
  }
  return errors;
}

function validateEmploymentPosition(position: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(1).test(position.trim())) {
    errors.push("Invalid position");
  }
  return errors;
}

function validateEmploymentStatus(status: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(1).test(status.trim())) {
    errors.push("Invalid status");
  }
  return errors;
}

function validateBasicSalary(salary: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThan(0.009).test(salary)) {
    errors.push("Invalid salary");
  }
  return errors;
}

export function validateEmployee(employee: EmployeesRecord) {
  const errors: { [key: string]: string[] } = {
    name: validateName(employee.name || ""),
    email: validateEmail(employee.email || ""),
    employmentSection: validateEmploymentSection(
      employee.employment_section || ""
    ),
    employmentPosition: validateEmploymentPosition(
      employee.employment_position || ""
    ),
    employmentStatus: validateEmploymentStatus(
      employee.employment_status || ""
    ),
    basicSalary: validateBasicSalary(employee.basic_salary || 0),
  };

  return errors;
}
