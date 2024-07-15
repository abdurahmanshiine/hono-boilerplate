import configs from "./config";
import Database from "./data";
import Api from "./api";

await Database.connect();
await Database.initModels();
Api.configure();

export default {
  port: configs.port,
  fetch: Api.app.fetch,
};
