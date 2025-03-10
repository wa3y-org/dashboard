import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/app/pocketbase-types";

const BackendURL =
  process.env.NODE_ENV == "development"
    ? "http://0.0.0.0:8090/"
    : "https://pb.wa3y-sd.org/";

const pb = new PocketBase(BackendURL) as TypedPocketBase;

pb.autoCancellation(false);

export function usePocketBase() {
  return pb;
}

// volunteer