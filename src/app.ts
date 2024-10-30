import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { router } from "./routers/index.js";
import { apiReference } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

export const app = new OpenAPIHono();

app.get(
  "/reference",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
  }),
);

app.use(
  prettyJSON({
    space: 4,
  }),
);
app.use(logger());

app.route("/", router);

app.notFound((c) => c.json({ message: `Not found` }));
app.onError((_, c) => c.json({ message: `Something Went Wrong` }));
