import { Hono } from "hono";
import { ClassControllers } from "../controllers";
import { ClassValidators } from "../validators";

const classRoutes = new Hono().basePath("/classes")

classRoutes.get("/", ClassValidators.getAll(), ClassControllers.getAll())

export default classRoutes;
