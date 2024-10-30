import { Hono } from "hono";
import { db } from "~/db/index.js";
import type { FC } from "hono/jsx";

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

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>
    </Layout>
  );
};

router.get("/jsx", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});
