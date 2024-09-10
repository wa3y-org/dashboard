import { BackendError } from "./BackendError";
import type {
  MultipleModelsResponse,
  OneModelResponse,
} from "./CRUDRepository";

export async function backendRequestOne<T>(
  fn: Function
): Promise<OneModelResponse<T>> {
  const response: OneModelResponse<T> = {
    model: null,
    error: null,
  };

  try {
    response.model = await fn();
  } catch (e: any) {
    response.error = new BackendError(e.response.message, e.response.code);
  }

  return response;
}

export async function backendRequestMultiple<T>(
  fn: Function
): Promise<MultipleModelsResponse<T>> {
  const response: MultipleModelsResponse<T> = {
    models: null,
    error: null,
  };

  try {
    response.models = await fn();
  } catch (e: any) {
    response.error = new BackendError(e.response.message, e.response.code);
  }

  return response;
}
