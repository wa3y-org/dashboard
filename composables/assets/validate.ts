import v8n from "v8n";
import type { TAsset } from "./index";

function validateTitle(title: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(3).test(title?.trim() || '')) {
    errors.push("Invalid title, min length must be 3 characters");
  }
  return errors;
}

function validateUnit(unit: any) {
  const errors: string[] = [];
  if (!v8n().string().minLength(1).test(unit?.trim() || '')) {
    errors.push("Invalid unit, min length must be 1 characters");
  }
  return errors;
}

function validateTotal(n: any) {
  const errors: string[] = [];
  if (!v8n().number().greaterThanOrEqual(0).test(n)) {
    errors.push("Invalid Total, min must be 0");
  }
  return errors;
}

export function validateAsset(asset: TAsset) {
  const errors: { [key: string]: string[] } = {
    title: validateTitle(asset.title),
    unit: validateUnit(asset.unit),
    functional_total: validateTotal(asset.functional_total),
    broken_total: validateTotal(asset.broken_total),
  };

  return errors;
}
