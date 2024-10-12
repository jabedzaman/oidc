import { AppModule } from "@/app/app.module";
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ip } from "@shared/utils";
import * as compression from "compression";
import { Response } from "express";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ["*"],
    },
  });
  const configService = app.get(ConfigService);
  const name: string = configService.get<string>("app.name");
  const port: number = configService.get<number>("app.http.port");
  const globalPrefix: string = configService.get<string>("app.globalPrefix");
  const versioningPrefix: string = configService.get<string>(
    "app.versioning.prefix"
  );
  const version: string = configService.get<string>("app.versioning.version");
  const versionEnable: string = configService.get<string>(
    "app.versioning.enable"
  );
  app.use(helmet());
  app.use(compression());
  app.getHttpAdapter().getInstance().set("json spaces", 4);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    })
  );
  app.setGlobalPrefix(globalPrefix);
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  app.getHttpAdapter().get("/", (_, res: Response) => {
    res.redirect("/api/health");
  });
  const logger = new Logger(name);
  await app.listen(port, () => {
    logger.log(
      `🚀 ${configService.get<string>("app.name").toLocaleUpperCase()} is running on ${ip()}:${port}`
    );
  });
}
bootstrap();
