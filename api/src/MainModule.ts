import { Logger, type MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomsController } from './room/RoomsController.js';
import { Database } from './Database.js';
import { LoggerModule } from './logger/LoggerModule.js';
import { LogRequestMiddleware } from './logger/LogRequestMiddleware.js';
import { HealthController } from './HealthController.js';
import { RoomWebSocket } from './room/RoomWebSocket.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerModule],
  providers: [Database, Logger, RoomWebSocket],
  controllers: [HealthController, RoomsController],
})
export class MainModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}
