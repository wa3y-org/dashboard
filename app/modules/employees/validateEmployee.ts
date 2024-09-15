import v8n from "v8n";
import type { EmployeesRecord, RolesRecord } from "~/app/pocketbase-types";
import { employeeConfig } from ".";

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

function validateRoles(roles: any) {
  const errors: string[] = [];
  if (roles.length < 1) {
    errors.push("Please Select one role ata least");
  }
  return errors;
}

function validatePassword(password: any) {
  const errors: string[] = [];
  if (
    !v8n().string().minLength(employeeConfig.minPasswordLength).test(password)
  ) {
    errors.push(
      `Invalid Password, min length must be ${employeeConfig.minPasswordLength} characters`
    );
  }
  return errors;
}

function validatePasswordConfirmation(
  password: any,
  passwordConfirmation: any
) {
  const errors: string[] = [];
  if (password !== passwordConfirmation) {
    errors.push("Password Confirmation Does'nt Match Password");
  }
  return errors.concat(validatePassword(password));
}

export function validateEmployee(
  employee: EmployeesRecord,
  shouldValidatePassword: boolean = true
) {
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
    roles: validateRoles(employee.roles),
    password: shouldValidatePassword ? validatePassword(employee.password) : [],
    passwordConfirm: shouldValidatePassword
      ? validatePasswordConfirmation(
          employee.password,
          employee.passwordConfirm
        )
      : [],
    oldPassword: [],
  };

  return errors;
}
