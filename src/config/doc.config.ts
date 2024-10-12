import { registerAs } from "@nestjs/config";

type DocConfig = {
  name: string;
  description: string;
  version: string;
  prefix: string;
  author: string;
  terms: string;
};

export default registerAs(
  "doc",
  (): Required<DocConfig> => ({
    name: `${process.env.APP_NAME}`,
    description: `The ${process.env.APP_NAME} api documentation`,
    version: "1.0",
    prefix: "/docs",
    author: `${process.env.APP_NAME} Team`,
    terms: `${process.env.APP_TERMS}`,
  }),
);
