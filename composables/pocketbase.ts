import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/app/pocketbase-types";

const BackendURL =
  process.env.NODE_ENV == "development"
    ? "http://0.0.0.0:8090/"
    : "http://pocketbase_8080-ngc04cscsokcokgskgcgw840.153.92.208.30.sslip.io/";

const pb = new PocketBase(BackendURL) as TypedPocketBase;

pb.autoCancellation(false);

export function usePocketBase() {
  return pb;
}
