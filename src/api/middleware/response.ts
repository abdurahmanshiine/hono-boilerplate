import { Context } from "hono";
import { createMiddleware } from "hono/factory";

export abstract class BaseErrorHandler {

}

export class HTMXResponseHandler extends BaseResponseHandler {
  successResponse = (c: Context<any, any, {}>) => { }

  // failureResponse = 
}
