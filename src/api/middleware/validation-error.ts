import { HTTPException } from "hono/http-exception";

export default class ValidationError extends HTTPException {
  constructor(message: string) {
    super(400, { message });
  }
}

