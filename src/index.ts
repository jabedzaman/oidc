import { serve } from "@hono/node-server";
import { app } from "./app.js";

const PORT = 3000;

console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
