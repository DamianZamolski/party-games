import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import 'source-map-support/register.js';
import { initSwagger } from './initSwagger.js';
import { MainModule } from './MainModule.js';

async function main() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  initSwagger(app);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 8888);
}

void main();
