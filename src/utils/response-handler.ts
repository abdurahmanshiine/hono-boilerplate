import { Context } from "hono";
import { HeaderRecord, HTTPResponse } from "../types/api/controllers";

export default function responseHandler(
  c: Context<any, any, {}>,
  response: HTTPResponse,
  statusCode: number = 200,
  headers: HeaderRecord = {},
): Response {
  return c.json(response, statusCode, headers)
};
