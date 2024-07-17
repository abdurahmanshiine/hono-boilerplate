import { createMiddleware } from "hono/factory"
import {
  getCookie,
} from "hono/cookie";
import { verify } from "hono/jwt";
import configs from "../../config"

class Auth {
  public authenticate = () => {
    //
    // return createMiddleware(async (c, next) => {
    //   try {
    //     const token = getCookie(c, "token")
    //     if (!token) {
    //       return c.redirect(signinRoute);
    //     }
    //
    //     // TODO: Add user session data to the request object
    //     const user = await verify(token, configs.jwtSecret)
    //
    //     await next();
    //   } catch (e) {
    //     // TODO: Handle the error
    //     console.error(e);
    //     return c.redirect(signinRoute);
    //   }
    // });
  }
}

export default new Auth()
