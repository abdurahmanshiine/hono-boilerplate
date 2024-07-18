import { BaseError } from "./base-error";

export default class NotFoundError extends BaseError {
  statusCode: number = 404;

  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: "Route not found" };
  }
}
