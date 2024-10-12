import configs from "@/config";
import { MODULES } from "@/modules";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TerminusModule } from "@nestjs/terminus";
import { DatabaseModule, PrismaService } from "@shared/database";
import { ResponseInterceptor } from "@shared/interceptors";
import { LoggerMiddleware } from "@shared/middlewares";
import { NodemailerService } from "@shared/nodemailer";
import { AppController } from "./app.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ...MODULES,
    TerminusModule,
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      global: true,
      useFactory: (configService: ConfigService) => ({
        global: true,
        signOptions: {
          algorithm: "RS256",
        },
        privateKey: configService.get<string>("auth.rsa.private"),
        publicKey: configService.get<string>("auth.rsa.public"),
      }),
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: [".env.local"],
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    NodemailerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
