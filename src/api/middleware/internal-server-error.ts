import { BaseError } from "./base-error";

export default class InternalServerError extends BaseError {
  statusCode: number = 500;

  constructor() {
    super("Internal server error");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: "Intetrnal server error" };
  }
}
