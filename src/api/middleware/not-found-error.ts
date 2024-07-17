import { HTTPException } from "hono/http-exception";

export default class NotFoundError extends HTTPException {
  constructor() {
    super(404, { message: "Route not found" });
  }
}


