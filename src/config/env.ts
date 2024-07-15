import Joi from "joi";
import { IEnvConfig } from "../types/config.d";

const env: IEnvConfig = {
  prod: Joi.boolean().validate(Bun.env.NODE_ENV).value === "production",
  stag: Joi.boolean().validate(Bun.env.NODE_ENV).value === "staging",
  dev: Joi.boolean().validate(Bun.env.NODE_ENV).value === "development",
  test: Joi.boolean().validate(Bun.env.NODE_ENV).value === "test",
};

export default env;
