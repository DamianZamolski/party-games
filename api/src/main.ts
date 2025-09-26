import 'source-map-support/register.js';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { initSwagger } from './initSwagger.js';
import { MainModule } from './MainModule.js';

async function main() {
  const app = await NestFactory.create(MainModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  initSwagger(app);
  await app.listen(process.env.PORT ?? 7777);
}

void main();
