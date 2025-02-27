import v8n from "v8n";
import type { TBankCheck } from "./index";

function validateSerialNumber(serial_number: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(serial_number?.trim() || '')) {
    errors.push("Invalid serial_number, min length must be 3 characters");
  }
  return errors;
}


function validateTotal(n: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0).test(n)) {
    errors.push("Invalid Total, min must be 0.1");
  }
  return errors;
}

export function validateBankCheck(check: TBankCheck) {
  const errors: { [key: string]: string[] } = {
    serial_number: validateSerialNumber(check.serial_number),
    amount: validateTotal(check.amount)
  };

  return errors;
}
