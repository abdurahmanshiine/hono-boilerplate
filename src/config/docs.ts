import path from "path";
import Joi from "joi";
import { IDocumentationConfig } from "../types/config.d";

const docsConfig: IDocumentationConfig = {
  enabled: Joi.string().valid("development", "production", "testing", "staging").validate(Bun.env.NODE_ENV).value !== "production",
  path: path.join(
    import.meta.dir,
    "..",
    Joi.string().validate(Bun.env.FILES_PATH ?? "./docs").value as string
  ),
};

export default docsConfig;
