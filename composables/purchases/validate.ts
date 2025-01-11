import v8n from "v8n";
import type { TPurchaseRequest } from "./index";

function validateTitle(title: any) {
  const errors: string[] = [];
  if (
    !v8n()
      .string()
      .minLength(3)
      .test(title?.trim() || "")
  ) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

function validatePrice(amount: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0.1).test(amount)) {
    errors.push("Invalid Price, min must be 0.1");
  }
  return errors;
}

export function validatePurchaseRequest(request: TPurchaseRequest) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(request.title),
    price: validatePrice(request.price),
  };

  return errors;
}
