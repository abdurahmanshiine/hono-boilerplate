import { HTTPException } from "hono/http-exception";

export default class InternalServerError extends HTTPException {
  constructor() {
    super(500, { message: "Internal Server Error" });
  }
}

