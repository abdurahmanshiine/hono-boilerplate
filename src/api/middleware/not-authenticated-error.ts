import { HTTPException } from "hono/http-exception";

export default class UnAuthenticatedError extends HTTPException {
  constructor() {
    super(401, { message: "You are not authenticated" });
  }
}
