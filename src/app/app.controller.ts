import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { PrismaService } from "@shared/database";
import { Public } from "@shared/decorators";
import { NodemailerService } from "@shared/nodemailer";

@ApiTags("app")
@ApiBearerAuth()
@Controller({
  path: "/",
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly prismaService: PrismaService,
    private readonly nodeMailerService: NodemailerService,
  ) {}

  @Public()
  @HealthCheck()
  @Get("/health")
  health() {
    return this.healthCheckService.check([
      () => this.prismaService.healthy(),
      () => this.nodeMailerService.healthy(),
    ]);
  }
}
