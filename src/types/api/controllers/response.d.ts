export type HTTPResponse = {
  message: string;
  data?: Record<string, any> | Array<Record<string, any>> | undefined;
}

export type HeaderRecord = Record<string, string | string[]>;
