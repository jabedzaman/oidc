import AppConfig from "./app.config";
import AuthConfig from "./auth.config";
import DbConfig from "./db.config";
import DocConfig from "./doc.config";
import s3Config from "./s3.config";
import SMTPConfig from "./smtp.config";

export default [
  AppConfig,
  DbConfig,
  SMTPConfig,
  DocConfig,
  AuthConfig,
  s3Config,
];
