import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { pick } from '../utils/pick.js';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(request: Request, _response: Response, next: NextFunction) {
    this.logger.log({
      msg: 'request',
      ...pick(request, ['method', 'url', 'headers', 'query', 'body']),
    });

    next();
  }
}
