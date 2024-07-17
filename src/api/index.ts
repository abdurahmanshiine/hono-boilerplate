import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
// import { bodyLimit } from 'hono/body-limit'
// import { compress } from 'hono/compress'
import { compress } from 'bun-compression'

import configs from "../config";
import { classRoutes } from "./routes";
import { Auth, InternalServerError, NotFoundError } from "./middleware";
import { showRoutes } from "hono/dev";
import { customLogger } from "../utils";
import { HTTPException } from "hono/http-exception";

class Api {
  public app: Hono;
  private routes: Hono;

  constructor() {
    this.app = new Hono({ strict: false }); // "strict: false" treats "/home" and "/home/" as the same route
    this.routes = new Hono().basePath(configs.apiRoot);
  }

  public configure(): void {
    this.applyStandardMiddleware();
    // this.applyMetricsMiddleware();
    // this.addHealthCheckRoute();
    // this.addDocsRoute();
    this.addRoutes();
    this.addDefaultRoute();
    this.addNotFoundRoute();
    this.addErrorHandler();
  }

  private applyStandardMiddleware(): void {
    // TODO: Configure properly
    this.app.use("*", cors({
      origin: configs.allowedOrigins,
      // maxAge: 600,
      // credentials: true,
    }));
    // TODO: Configure properly
    if (configs.env.prod) this.app.use(secureHeaders({}));
    // TODO: Customize logger
    this.app.use("*", logger(customLogger));
    // NOTE: The original Hono compress function isn't working as of now, because Bun doesn't support CompressionStream yet!
    // This is a temporary measure
    // this.app.use(compress({
    //   encoding: "gzip",
    // }))
    this.app.use("*", compress());
  }

  // private applyMetricsMiddleware(): void {}

  // private addHealthCheckRoute(): void {}

  // private addDocsRoute(): void {}

  private addRoutes(): void {
    // Pages routes
    this.routes.route("/", classRoutes);
    // this.routes.route("/", authPages);

    // TODO: Enable authorized routes
    // this.app.use(Auth.authenticate());

    this.app.route("/", this.routes);

    // FIXME: Remove
    showRoutes(this.app, {
      verbose: true,
    })
  }

  private addDefaultRoute(): void {
    this.app.all("*", (c) => {
      return c.notFound();
    });
  }

  private addNotFoundRoute(): void {
    this.app.notFound(async (c) => {
      console.log("Route not found:", c.req.url);
      throw new NotFoundError();
    });
  }

  private addErrorHandler(): void {
    this.app.onError(async (err, c): Promise<Response> => {
      if (err instanceof HTTPException) {
        console.log(err.getResponse())
        return err.getResponse()
        // return c.json({ message: "janno" })
      } else {
        return c.json({
          message: "Internal Server Error",
        }, 200)
      }
    })
  }
}

export default new Api();
