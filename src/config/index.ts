import jsonPackage from "../../package.json";
import Joi from "joi";
import { Commons } from "../types/api/routes";
import { IConfigs } from "../types/config.d";
import mongo from "./mongo";
import env from "./env";
import docsConfig from "./docs";

const configs: IConfigs = {
  version: Joi.string().validate(
    Bun.env.npm_package_version ?? jsonPackage.version
  ).value as string,
  serviceName: Joi.string().validate(Bun.env.npm_package_name ?? "sms")
    .value as string,
  port: Joi.number().validate(Bun.env.PORT ?? 5000).value as number,
  domain: Joi.string().domain().validate(Bun.env.DOMAIN ?? "http://localhost:5000").value as string,
  apiRoot: Joi.string().validate(Bun.env.API_ROOT ?? "/api/v0")
    .value as Commons.ApiRoot,
  timezone: Joi.string().validate(Bun.env.TZ ?? "Africa/Mogadishu")
    .value as string,
  jwtSecret: Joi.string().validate(Bun.env.JWT_SECRET ?? "__someSecret__")
    .value as string,
  allowedOrigins: [
    Joi.string().validate(Bun.env.ALLOWED_ORIGIN ?? `http://localhost:${Bun.env.PORT}`)
      .value as string,
  ],
  env,
  mongo,
  documentation: docsConfig,
};

export default configs;
