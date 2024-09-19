import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/app/pocketbase-types";

const pb = new PocketBase("http://pocketbase_8080-ngc04cscsokcokgskgcgw840.153.92.208.30.sslip.io") as TypedPocketBase;

pb.autoCancellation(false);

export function usePocketBase() {
  return pb;
}
