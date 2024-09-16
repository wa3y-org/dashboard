import { addAsset } from "./assets/create";
import { getAllAssets, getOneAsset } from "./assets/get";
import { removeAsset } from "./assets/remove";
import { updateAsset } from "./assets/update";
import { validateAsset } from "./assets/validate";

export function useAssets() {
  return {
    validate: validateAsset,
    create: addAsset,
    get: {
      all: getAllAssets,
      one: getOneAsset,
    },
    update: updateAsset,
    remove: removeAsset,
  };
}
