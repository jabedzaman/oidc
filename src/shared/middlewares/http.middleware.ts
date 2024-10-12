import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request;
    const user_agent = request.get("user-agent") || "";

    response.on("close", () => {
      const { statusCode } = response;
      const content_length = response.get("content-length");

      if (process.env.NODE_ENV === "production") {
        this.logger.log(
          `${method} ${url} ${statusCode} ${content_length} - ${user_agent} ${ip}`,
        );
      } else {
        this.logger.log(`${method} ${url} ${statusCode} ${content_length}`);
      }
    });

    next();
  }
}
