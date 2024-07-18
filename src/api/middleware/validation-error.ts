import { BaseError } from "./base-error";

export default class ValidationError extends BaseError {
  statusCode: number = 400;

  constructor(public message: string) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return { statusCode: this.statusCode, message: this.message };
  }
}

