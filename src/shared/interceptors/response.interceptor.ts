import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { firstValueFrom, of } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<any> {
    const body = (await firstValueFrom(next.handle())) ?? {};
    const status =
      this.reflector.get<number>("__httpCode__", context.getHandler()) || 200;
    const message = body?.message || "Success";
    return of({
      statusCode: status,
      message,
      data: body,
    });
  }
}
