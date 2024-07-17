import { HTTPException } from "hono/http-exception";

export default class UnAuthorizedError extends HTTPException {
  constructor() {
    super(403, { message: "You are not authorized" });
  }
}
