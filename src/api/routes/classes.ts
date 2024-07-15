import { Hono } from "hono";
import { ClassControllers } from "../controllers";

const classRoutes = new Hono().basePath("/classes")

classRoutes.get("/", ClassControllers.getAll())

export default classRoutes;
