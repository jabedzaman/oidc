import { registerAs } from "@nestjs/config";
import { readFileSync } from "fs";

type AuthConfig = {
  accessToken: {
    expiresIn: string;
  };
  refreshToken: {
    expiresIn: string;
  };
  rsa: {
    private: string;
    public: string;
  };
};

const privateKey = readFileSync(
  process.env.PRIVATE_KEY_PATH ?? "./private.pem",
  "utf8"
);
const publicKey = readFileSync(
  process.env.PUBLIC_KEY_PATH ?? "./public.pem",
  "utf8"
);

export default registerAs(
  "auth",
  (): Required<AuthConfig> => ({
    accessToken: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ?? "30d",
    },
    refreshToken: {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "1y",
    },
    rsa: {
      private: privateKey,
      public: publicKey,
    },
  })
);
