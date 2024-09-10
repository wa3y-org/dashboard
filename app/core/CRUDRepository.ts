import type { BackendError } from "./BackendError";

export type OneModelResponse<T> = {
  model: T | null;
  error: BackendError | null;
};

export type MultipleModelsResponse<T> = {
  models: T[] | null;
  error: BackendError | null;
};

export interface BackendCRUDRepository<T> {
  /**
   * creates new model to backend
   * @param model the model we want to create
   */
  create(model: T): Promise<OneModelResponse<T>>;
  // update(model: T): OneModelResponse<T>;
  // remove(model: T): OneModelResponse<T>;
  // fetchOne(model: T): OneModelResponse<T>;
  // fetchAll(): MultipleModelsResponse<T>;
}
