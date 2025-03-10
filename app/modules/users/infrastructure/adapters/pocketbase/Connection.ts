import PocketBase from "pocketbase";

const BackendURL =
  process.env.NODE_ENV == "development"
    ? "http://0.0.0.0:8090/"
    : "https://pb.wa3y-sd.org/";

export const pb = new PocketBase(BackendURL);
