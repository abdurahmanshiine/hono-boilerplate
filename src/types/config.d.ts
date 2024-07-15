import { ApiRoot } from "./api/routes/common.d";

export interface IConfigs {
  version: string;
  serviceName: string;
  timezone: string;
  port: number;
  domain: string;
  apiRoot: ApiRoot;
  jwtSecret: string;
  allowedOrigins: Array<string>;
  env: IEnvConfig;
  mongo: IMongoDB;
  documentation: IDocumentationConfig;
}

export interface IEnvConfig {
  prod: boolean;
  stag: boolean;
  dev: boolean;
  test: boolean;
}

export interface IMongoDB {
  url: string;
  db: string;
  username: string;
  password: string;
  adminUsername: string;
  adminPassword: string;
  schemaVersion: string;
}

export interface IDocumentationConfig {
  enabled: boolean;
  path: string;
}
