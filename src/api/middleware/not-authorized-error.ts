import { BaseError } from "./base-error";

export default class UnAuthorizedError extends BaseError {
  statusCode: number = 403;

  constructor() {
    super("You are not authorized");
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: "You are not authorized" };
  }
}
