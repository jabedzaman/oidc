import { registerAs } from "@nestjs/config";

type SMTPConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

export default registerAs(
  "smtp",
  (): Required<SMTPConfig> => ({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }),
);
