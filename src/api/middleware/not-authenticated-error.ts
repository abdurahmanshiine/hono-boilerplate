import { BaseError } from "./base-error";

export default class UnAuthenticatedError extends BaseError {
  statusCode: number = 401;

  constructor() {
    super("You are not authenticated");
    Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: "You are not authenticated" };
  }
}
