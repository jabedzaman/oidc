import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { router } from "./routers/index.js";
import { apiReference } from "@scalar/hono-api-reference";

export const app = new Hono();

app.get(
  "/reference",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
  })
);

app.use(
  prettyJSON({
    space: 4,
  })
);
app.use(logger());

app.route("/", router);
