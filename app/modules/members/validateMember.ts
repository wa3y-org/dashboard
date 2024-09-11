import v8n from "v8n";
import type { MembersRecord, MembersResponse } from "~/app/pocketbase-types";

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

function validateMembershipStatus(status: string) {
  const errors: string[] = [];
  if (!v8n().string().minLength(1).test(status.trim())) {
    errors.push("Invalid status");
  }
  return errors;
}

export function validateMember(member: MembersRecord | MembersResponse) {
  const errors: { [key: string]: string[] } = {
    name: validateName(member.name || ""),
    email: validateEmail(member.email || ""),
    employmentStatus: validateMembershipStatus(member.membership_status || ""),
  };

  return errors;
}
