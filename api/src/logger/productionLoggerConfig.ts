import type { TransportSingleOptions } from 'pino';
import { lokiUrl } from './lokiUrl.js';
import { developmentLoggerConfig } from './developmentLoggerConfig.js';

export const productionLoggerConfig: TransportSingleOptions = lokiUrl
  ? {
      target: 'pino-loki',
      options: {
        host: lokiUrl,
        interval: 5,
        json: true,
        labels: { app: 'api' },
      },
    }
  : developmentLoggerConfig;
