import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HealthIndicatorResult } from "@nestjs/terminus";
import * as nodemailer from "nodemailer";

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>("smtp.host"),
      port: this.configService.getOrThrow<number>("smtp.port"),
      auth: {
        user: this.configService.getOrThrow<string>("smtp.user"),
        pass: this.configService.getOrThrow<string>("smtp.pass"),
      },
    });
  }

  async send(options: nodemailer.SendMailOptions) {
    await this.healthy().then((result) => {
      if (!result.smtp) {
        throw new Error("SMTP connection failed");
      }
    });
    return this.transporter.sendMail({
      from: this.configService.getOrThrow("smtp.from"),
      ...options,
    });
  }

  async healthy(): Promise<HealthIndicatorResult> {
    try {
      await this.transporter.verify();
      return Promise.resolve({
        prisma: {
          status: "up",
        },
      });
    } catch (error) {
      return Promise.resolve({
        prisma: {
          status: "down",
        },
      });
    }
  }
}
