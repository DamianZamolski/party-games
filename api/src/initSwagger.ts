import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(app: INestApplication<unknown>) {
  const documentConfig = new DocumentBuilder().setTitle('api').build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/', app, document);
}
