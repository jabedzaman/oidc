import { Hono } from "hono";
import { db } from "~/db/index.js";

export const router = new Hono();

router.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

router.get("/health", async (c) => {
  try {
    await db.execute("SELECT 1");
    return c.json({ status: "ok", message: "Database is healthy" });
  } catch (error: any) {
    return c.json({ status: "error", error: error.message });
  }
});
