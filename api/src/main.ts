import 'source-map-support/register.js';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './MainModule.js';
import { initSwagger } from './initSwagger.js';

async function main() {
  const app = await NestFactory.create(MainModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  initSwagger(app);
  await app.listen(process.env.PORT ?? 7777);
}

void main();
