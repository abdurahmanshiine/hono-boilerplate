import { BaseError } from "./base-error";

export default class BadRequestError extends BaseError {
  statusCode: number = 400;

  constructor() {
    super("Bad request");
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: "Bad request" };
  }
}
