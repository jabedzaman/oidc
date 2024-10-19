import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";

export const setupSwagger = async (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const logger = new Logger("Docs");

  const doc_name: string = configService.getOrThrow<string>("doc.name");
  const doc_desc: string = configService.getOrThrow<string>("doc.description");
  const doc_version: string = configService.getOrThrow<string>("doc.version");
  const doc_prefix: string = configService.getOrThrow<string>("doc.prefix");
  const doc_terms: string = configService.getOrThrow<string>("doc.terms");
  const app_contact: string = configService.getOrThrow<string>("app.contact");
  const app_url: string = "https://jabed.dev";

  const documentBuild = new DocumentBuilder()
    .setTitle(doc_name)
    .setDescription(doc_desc)
    .setVersion(doc_version)
    .setTermsOfService(doc_terms)
    .setContact(doc_name, app_url, `mailto:${app_contact}`)
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token"
    )
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "refresh-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
  });
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customfavIcon: "/favicon.ico",
  };
  SwaggerModule.setup(doc_prefix, app, document, {
    explorer: true,
    customSiteTitle: doc_name,
    ...customOptions,
  });
  logger.log(`Docs will serve on ${doc_prefix}`, "NestApplication");
};
