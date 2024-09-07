import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/app/pocketbase-types";

const pb = new PocketBase("http://0.0.0.0:8090") as TypedPocketBase;

pb.autoCancellation(false);

export function usePocketBase() {
  return pb;
}
