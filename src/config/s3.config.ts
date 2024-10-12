import { registerAs } from "@nestjs/config";

type S3Config = {
  region: string;
  endpoint: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

export default registerAs(
  "s3",
  (): Required<S3Config> => ({
    region: process.env.S3_REGION ?? "auto",
    endpoint: process.env.S3_ENDPOINT ?? "",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
    },
  }),
);
