import PocketBase from "pocketbase";

const BackendURL =
  process.env.NODE_ENV == "development"
    ? "http://0.0.0.0:8090/"
    : "http://pocketbase_8080-ngc04cscsokcokgskgcgw840.153.92.208.30.sslip.io/";

export const pb = new PocketBase(BackendURL);
