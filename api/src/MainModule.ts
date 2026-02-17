import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/envSchema.js';
import { HealthController } from './health/HealthController.js';
import { LoggerModule } from './logger/LoggerModule.js';
import { LogRequestMiddleware } from './logger/LogRequestMiddleware.js';
import { type MiddlewareConsumer, Module, Logger } from '@nestjs/common';
import { MainGateway } from './MainGateway.js';
import { RoomsService } from './rooms/RoomsService.js';
import { PrismaService } from './PrismaService.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    LoggerModule,
  ],
  controllers: [HealthController],
  providers: [Logger, MainGateway, PrismaService, RoomsService],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}
