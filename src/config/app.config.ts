import { registerAs } from "@nestjs/config";

type AppConfig = {
  name: string;
  env: string;
  versioning: {
    enable: boolean;
    prefix: string;
    version: string;
  };
  http: {
    enable: boolean;
    host: string;
    port: number;
  };
  contact: string;
};

export default registerAs(
  "app",
  (): Required<AppConfig> => ({
    name: process.env.APP_NAME || "oidc",
    env: process.env.APP_ENV || "development",
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === "true" || false,
      prefix: "v",
      version: process.env.HTTP_VERSION ?? "1",
    },
    http: {
      enable: process.env.HTTP_ENABLE === "true" || false,
      host: process.env.HTTP_HOST || "0.0.0.0",
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 8080,
    },
    contact: process.env.APP_CONTACT || "hi@jabed.dev",
  })
);
