import Joi from "joi";
import { IMongoDB } from "../types/config.d";

const mongo: IMongoDB = {
  url: Joi.string().validate(
    Bun.env.MONGO_URL ?? "localhost:27017"
  ).value as string,
  db: Joi.string().validate(
    Bun.env.MONGO_DB ?? "tabsera_sms"
  ).value as string,
  username: Joi.string().validate(Bun.env.MONGO_USERNAME ?? "tabsera")
    .value as string,
  password: Joi.string().validate(Bun.env.MONGO_PASSWORD ?? "shiine2024")
    .value as string,
  adminUsername: Joi.string().validate(
    Bun.env.MONGO_DB_ADMIN_USERNAME ?? "root"
  ).value as string,
  adminPassword: Joi.string().validate(
    Bun.env.MONGO_DB_ADMIN_PASSWORD ?? "shiine2024"
  ).value as string,
  schemaVersion: Joi.string().validate(Bun.env.SCHEMA_VERSION ?? "v1.0.0")
    .value as string,
};

export default mongo;

